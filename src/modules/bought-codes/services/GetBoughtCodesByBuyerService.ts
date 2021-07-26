/* eslint-disable camelcase */
import HTTPStatusCode from 'http-status-codes';

import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import IBoughtCodesRepository from '../repositories/IBoughtCodesRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import AppError from '../../app/errors/AppError';
import messages from '../../app/intl/messages/en-US';
import { BoughtCode } from '../repositories/dto';

interface ExecuteDTO {
  buyerId: string;
  limit?: number;
  page?: number;
}

interface ExecuteResponse {
  results: BoughtCode[];
}

class GetBoughtCodeByBuyerService {
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
    buyerId,
    limit = 10,
    page = 0,
  }: ExecuteDTO): Promise<ExecuteResponse> {
    try {
      await this.databaseRepository.beginTransaction();

      const buyerUser = await this.usersRepository.findUserById({
        userId: buyerId,
      });
      if (!buyerUser) {
        throw new AppError(
          messages.errors.BUYER_NOT_FOUND,
          HTTPStatusCode.NOT_FOUND,
        );
      }

      const offset = limit * page;
      const boughtCodes = await this.boughtCodesRepository.findBoughtCodesByBuyerId(
        {
          buyerId,
          limit,
          offset,
        },
      );

      await this.databaseRepository.commit();

      return { results: boughtCodes };
    } catch (error) {
      await this.databaseRepository.rollback();
      throw error;
    }
  }
}

export default GetBoughtCodeByBuyerService;
