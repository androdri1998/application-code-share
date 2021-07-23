import HTTPStatusCode from 'http-status-codes';

import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import AppError from '../../app/errors/AppError';
import messages from '../../app/intl/messages/en-US';
import ICodesRepository from '../repositories/ICodesRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import { Code } from '../repositories/dto';

interface ExecuteDTO {
  codeId: string;
  userId: string;
  isValid: boolean;
}

interface ExecuteResponse {
  code: Code;
}

class UpdateValidateCodeService {
  private usersRepository: IUsersRepository;

  private codesRepository: ICodesRepository;

  private databaseRepository: IDatabaseRepository;

  constructor(
    usersRepository: IUsersRepository,
    codesRepository: ICodesRepository,
    databaseRepository: IDatabaseRepository,
  ) {
    this.usersRepository = usersRepository;
    this.codesRepository = codesRepository;
    this.databaseRepository = databaseRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({
    codeId,
    userId,
    isValid,
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

      const code = await this.codesRepository.findCodeByIdWithoutValidate({
        codeId,
      });
      if (!code) {
        throw new AppError(
          messages.errors.CODE_NOT_FOUND,
          HTTPStatusCode.NOT_FOUND,
        );
      }

      if (code.user_id !== user.id) {
        throw new AppError(
          messages.errors.CODE_CANNOT_BE_UPDATED_BY_CURRENT_USER,
          HTTPStatusCode.CONFLICT,
        );
      }

      const codeUpdated = await this.codesRepository.updateIsValidById({
        codeId,
        isValid,
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
      await this.databaseRepository.rollback();
      throw error;
    }
  }
}

export default UpdateValidateCodeService;
