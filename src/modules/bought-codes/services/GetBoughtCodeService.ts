/* eslint-disable camelcase */
import HTTPStatusCode from 'http-status-codes';

import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import AppError from '../../app/errors/AppError';
import messages from '../../app/intl/messages/en-US';
import IBoughtCodesRepository from '../repositories/IBoughtCodesRepository';
import { BoughtCode } from '../repositories/dto';

interface ExecuteDTO {
  boughtCodeId: string;
}

interface ExecuteResponse {
  bought_code: BoughtCode;
}

class GetBoughtCodeService {
  private boughtCodesRepository: IBoughtCodesRepository;

  private databaseRepository: IDatabaseRepository;

  constructor(
    boughtCodesRepository: IBoughtCodesRepository,
    databaseRepository: IDatabaseRepository,
  ) {
    this.boughtCodesRepository = boughtCodesRepository;
    this.databaseRepository = databaseRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({ boughtCodeId }: ExecuteDTO): Promise<ExecuteResponse> {
    try {
      await this.databaseRepository.beginTransaction();

      const boughtCode = await this.boughtCodesRepository.findBoughtCodeById({
        boughtCodeId,
      });
      if (!boughtCode) {
        throw new AppError(
          messages.errors.BOUGHT_CODE_NOT_FOUND,
          HTTPStatusCode.NOT_FOUND,
        );
      }

      await this.databaseRepository.commit();

      return { bought_code: boughtCode };
    } catch (error) {
      await this.databaseRepository.rollback();
      throw error;
    }
  }
}

export default GetBoughtCodeService;
