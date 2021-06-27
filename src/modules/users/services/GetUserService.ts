/* eslint-disable camelcase */
import HTTPStatusCode from 'http-status-codes';

import AppError from '../../app/errors/AppError';
import messages from '../../app/intl/messages/en-US';
import IUsersRepository from '../repositories/IUsersRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';

interface ExecuteDTO {
  userId: string;
}

interface ExecuteResponse {
  user: {
    id: string;
    username: string;
    description: string | null;
    birth_date: string;
    email: string;
    profile_photo: string | null;
    cover_photo: string | null;
    created_at: string;
    updated_at: string | null;
  };
}

class GetUserService {
  private usersRepository: IUsersRepository;

  private databaseRepository: IDatabaseRepository;

  constructor(
    usersRepository: IUsersRepository,
    databaseRepository: IDatabaseRepository,
  ) {
    this.usersRepository = usersRepository;
    this.databaseRepository = databaseRepository;

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

      return { user };
    } catch (error) {
      await this.databaseRepository.rollback();
      throw error;
    }
  }
}

export default GetUserService;
