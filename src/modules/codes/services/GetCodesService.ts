import HTTPStatusCode from 'http-status-codes';

import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import AppError from '../../app/errors/AppError';
import messages from '../../app/intl/messages/en-US';
import ICodesRepository from '../repositories/ICodesRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import { Code } from '../repositories/dto';

interface ExecuteDTO {
  limit?: number;
  page?: number;
  userId?: string;
}

interface ExecuteResponse {
  results: Code[];
}

class GetCodesService {
  private usersRepository: IUsersRepository;

  private codeRepository: ICodesRepository;

  private databaseRepository: IDatabaseRepository;

  constructor(
    usersRepository: IUsersRepository,
    codeRepository: ICodesRepository,
    databaseRepository: IDatabaseRepository,
  ) {
    this.usersRepository = usersRepository;
    this.codeRepository = codeRepository;
    this.databaseRepository = databaseRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({
    limit = 10,
    page = 0,
    userId,
  }: ExecuteDTO): Promise<ExecuteResponse> {
    try {
      await this.databaseRepository.beginTransaction();

      let codes = [];
      const offset = limit * page;
      if (userId) {
        const user = await this.usersRepository.findUserById({
          userId,
        });

        if (!user) {
          throw new AppError(
            messages.errors.USER_NOT_FOUND,
            HTTPStatusCode.NOT_FOUND,
          );
        }
        codes = await this.codeRepository.findCodesByUserId({
          userId,
          limit,
          offset,
        });
      } else {
        codes = await this.codeRepository.findCodes({
          limit,
          offset,
        });
      }

      await this.databaseRepository.commit();

      return { results: codes };
    } catch (error) {
      await this.databaseRepository.rollback();
      throw error;
    }
  }
}

export default GetCodesService;
