import HTTPStatusCode from 'http-status-codes';

import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import AppError from '../../app/errors/AppError';
import messages from '../../app/intl/messages/en-US';
import ICodesRepository from '../repositories/ICodesRepository';
import { Code } from '../repositories/dto';

interface ExecuteDTO {
  codeId: string;
  code: string;
}

interface ExecuteResponse {
  code: Code;
}

class UpdateCodeByCodeIdService {
  private codeRepository: ICodesRepository;

  private databaseRepository: IDatabaseRepository;

  constructor(
    codeRepository: ICodesRepository,
    databaseRepository: IDatabaseRepository,
  ) {
    this.codeRepository = codeRepository;
    this.databaseRepository = databaseRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({
    codeId,
    code: codeToUpdate,
  }: ExecuteDTO): Promise<ExecuteResponse> {
    try {
      await this.databaseRepository.beginTransaction();

      const code = await this.codeRepository.findCodeById({
        codeId,
      });

      if (!code) {
        throw new AppError(
          messages.errors.CODE_NOT_FOUND,
          HTTPStatusCode.NOT_FOUND,
        );
      }

      const codeUpdated = await this.codeRepository.updateCodeById({
        codeId,
        code: codeToUpdate,
      });

      if (!codeUpdated) {
        throw new AppError(
          messages.errors.CODE_NOT_FOUND,
          HTTPStatusCode.NOT_FOUND,
        );
      }

      await this.databaseRepository.commit();

      return { code: codeUpdated };
    } catch (error) {
      console.log(error);
      await this.databaseRepository.rollback();
      throw error;
    }
  }
}

export default UpdateCodeByCodeIdService;
