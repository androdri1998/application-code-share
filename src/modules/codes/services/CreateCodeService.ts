import HTTPStatusCode from 'http-status-codes';

import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import AppError from '../../app/errors/AppError';
import messages from '../../app/intl/messages/en-US';
import ICodesRepository from '../repositories/ICodesRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import { Code } from '../repositories/dto';

interface ExecuteDTO {
  userId: string;
  code: string;
  unavailableAt?: string;
}

interface ExecuteResponse {
  code: Code;
}

class CreateCodeService {
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
    unavailableAt,
    code,
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

      const codeCreated = await this.codesRepository.createCode({
        code,
        userId,
        unavailableAt,
      });
      await this.databaseRepository.commit();

      return { code: codeCreated };
    } catch (error) {
      await this.databaseRepository.rollback();
      throw error;
    }
  }
}

export default CreateCodeService;
