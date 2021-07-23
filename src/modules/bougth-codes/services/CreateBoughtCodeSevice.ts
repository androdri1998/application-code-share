/* eslint-disable camelcase */
import HTTPStatusCode from 'http-status-codes';

import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import AppError from '../../app/errors/AppError';
import messages from '../../app/intl/messages/en-US';
import IBoughtCodesRepository from '../repositories/IBoughtCodesRepository';
import ICodesRepository from '../../codes/repositories/ICodesRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import { BoughtCode } from '../repositories/dto';

interface ExecuteDTO {
  codeId: string;
  buyer: string;
}

interface ExecuteResponse {
  bought_code: BoughtCode;
}

class CreateBoughtCodeSevice {
  private usersRepository: IUsersRepository;

  private boughtCodesRepository: IBoughtCodesRepository;

  private codesRepository: ICodesRepository;

  private databaseRepository: IDatabaseRepository;

  constructor(
    usersRepository: IUsersRepository,
    boughtCodesRepository: IBoughtCodesRepository,
    codesRepository: ICodesRepository,
    databaseRepository: IDatabaseRepository,
  ) {
    this.usersRepository = usersRepository;
    this.boughtCodesRepository = boughtCodesRepository;
    this.codesRepository = codesRepository;
    this.databaseRepository = databaseRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({ codeId, buyer }: ExecuteDTO): Promise<ExecuteResponse> {
    try {
      await this.databaseRepository.beginTransaction();

      const code = await this.codesRepository.findCodeById({
        codeId,
      });
      if (!code) {
        throw new AppError(
          messages.errors.CODE_NOT_FOUND,
          HTTPStatusCode.NOT_FOUND,
        );
      }

      if (buyer === code.user_id) {
        throw new AppError(
          messages.errors.BUYER_AND_SELLER_ARE_THE_SAME,
          HTTPStatusCode.NOT_FOUND,
        );
      }

      const buyerUser = await this.usersRepository.findUserById({
        userId: buyer,
      });
      if (!buyerUser) {
        throw new AppError(
          messages.errors.BUYER_NOT_FOUND,
          HTTPStatusCode.NOT_FOUND,
        );
      }

      const sellerUser = await this.usersRepository.findUserById({
        userId: code.user_id,
      });
      if (!sellerUser) {
        throw new AppError(
          messages.errors.SELLER_NOT_FOUND,
          HTTPStatusCode.NOT_FOUND,
        );
      }

      const boughtCode = await this.boughtCodesRepository.createBoughtCode({
        buyer,
        code: code.code,
        codeId: code.id,
        seller: code.user_id,
        unavailableAt: code.unavailable_at,
      });

      await this.databaseRepository.commit();

      return { bought_code: boughtCode };
    } catch (error) {
      await this.databaseRepository.rollback();
      throw error;
    }
  }
}

export default CreateBoughtCodeSevice;
