/* eslint-disable camelcase */
import HTTPStatusCode from 'http-status-codes';

import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import AppError from '../../app/errors/AppError';
import messages from '../../app/intl/messages/en-US';
import IBoughtCodesRepository from '../repositories/IBoughtCodesRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';

interface ExecuteDTO {
  boughtCodeId: string;
  userId: string;
}

interface ExecuteResponse {
  message: string;
}

class RemoveBoughtCodeService {
  private usersRepository: IUsersRepository;

  private boughtCodesRepository: IBoughtCodesRepository;

  private databaseRepository: IDatabaseRepository;

  constructor(
    usersRepository: IUsersRepository,
    boughtCodesRepository: IBoughtCodesRepository,
    databaseRepository: IDatabaseRepository,
  ) {
    this.usersRepository = usersRepository;
    this.boughtCodesRepository = boughtCodesRepository;
    this.databaseRepository = databaseRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({
    boughtCodeId,
    userId,
  }: ExecuteDTO): Promise<ExecuteResponse> {
    try {
      await this.databaseRepository.beginTransaction();

      const user = await this.usersRepository.findUserById({
        userId,
      });
      if (!user) {
        throw new AppError(
          messages.errors.USER_NOT_FOUND,
          HTTPStatusCode.NOT_FOUND,
        );
      }

      const boughtCode = await this.boughtCodesRepository.findBoughtCodeById({
        boughtCodeId,
      });
      if (!boughtCode) {
        throw new AppError(
          messages.errors.BOUGHT_CODE_NOT_FOUND,
          HTTPStatusCode.NOT_FOUND,
        );
      }

      if (boughtCode.buyer !== userId && boughtCode.seller !== userId) {
        throw new AppError(
          messages.errors.USER_CANNOT_DO_THIS_ACTION,
          HTTPStatusCode.CONFLICT,
        );
      }

      await this.boughtCodesRepository.removeBoughtCode({
        boughtCodeId,
      });

      await this.databaseRepository.commit();

      return { message: messages.responses.BOUGHT_CODE_DELETED_WITH_SUCCESS };
    } catch (error) {
      await this.databaseRepository.rollback();
      throw error;
    }
  }
}

export default RemoveBoughtCodeService;
