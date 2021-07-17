import HTTPStatusCode from 'http-status-codes';

import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import AppError from '../../app/errors/AppError';
import messages from '../../app/intl/messages/en-US';
import ICodesRepository from '../repositories/ICodesRepository';

interface ExecuteDTO {
  codeId: string;
}

interface ExecuteResponse {
  message: string;
}

class RemoveCodeService {
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

  async execute({ codeId }: ExecuteDTO): Promise<ExecuteResponse> {
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

      await this.codeRepository.removeCodeById({
        codeId,
      });

      await this.databaseRepository.commit();

      return { message: messages.responses.CODE_DELETED_WITH_SUCCESS };
    } catch (error) {
      await this.databaseRepository.rollback();
      throw error;
    }
  }
}

export default RemoveCodeService;
