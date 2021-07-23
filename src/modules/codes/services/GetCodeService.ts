import HTTPStatusCode from 'http-status-codes';

import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import AppError from '../../app/errors/AppError';
import messages from '../../app/intl/messages/en-US';
import ICodesRepository from '../repositories/ICodesRepository';
import { Code } from '../repositories/dto';

interface ExecuteDTO {
  codeId: string;
}

interface ExecuteResponse {
  code: Code;
}

class GetCodeService {
  private codesRepository: ICodesRepository;

  private databaseRepository: IDatabaseRepository;

  constructor(
    codesRepository: ICodesRepository,
    databaseRepository: IDatabaseRepository,
  ) {
    this.codesRepository = codesRepository;
    this.databaseRepository = databaseRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({ codeId }: ExecuteDTO): Promise<ExecuteResponse> {
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

      await this.databaseRepository.commit();

      return { code };
    } catch (error) {
      await this.databaseRepository.rollback();
      throw error;
    }
  }
}

export default GetCodeService;
