/* eslint-disable camelcase */
import HTTPStatusCode from 'http-status-codes';

import AppError from '../../app/errors/AppError';
import messages from '../../app/intl/messages/en-US';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserLoginCodeRepository from '../repositories/IUserLoginCodeRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';

interface ExecuteDTO {
  userId: string;
}

interface ExecuteResponse {
  message: string;
}

class GetUserService {
  private usersRepository: IUsersRepository;

  private userLoginCodeRepository: IUserLoginCodeRepository;

  private databaseRepository: IDatabaseRepository;

  constructor(
    usersRepository: IUsersRepository,
    databaseRepository: IDatabaseRepository,
    userLoginCodeRepository: IUserLoginCodeRepository,
  ) {
    this.usersRepository = usersRepository;
    this.databaseRepository = databaseRepository;
    this.userLoginCodeRepository = userLoginCodeRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({ userId }: ExecuteDTO): Promise<ExecuteResponse> {
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

      await this.userLoginCodeRepository.removeUserLoginCodesByUserId({
        userId,
      });

      await this.usersRepository.removeUserById({
        userId,
      });

      await this.databaseRepository.commit();

      return { message: messages.responses.USER_DELETED_WITH_SUCCESS };
    } catch (error) {
      await this.databaseRepository.rollback();
      throw error;
    }
  }
}

export default GetUserService;
