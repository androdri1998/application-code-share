/* eslint-disable camelcase */
import IUsersRepository from '../repositories/IUsersRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';

interface ExecuteDTO {
  username?: string;
  limit?: number;
  page?: number;
}

interface ExecuteResponse {
  results: {
    id: string;
    username: string;
    description: string | null;
    birth_date: string;
    email: string;
    profile_photo: string | null;
    cover_photo: string | null;
    created_at: string;
    updated_at: string | null;
  }[];
}

class GetUsersService {
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

  async execute({
    username,
    limit = 10,
    page = 0,
  }: ExecuteDTO): Promise<ExecuteResponse> {
    try {
      await this.databaseRepository.beginTransaction();

      const offset = limit * page;
      const users = await this.usersRepository.findUsersByUsername({
        username,
        limit,
        offset,
      });

      return {
        results: users,
      };
    } catch (error) {
      await this.databaseRepository.rollback();
      throw error;
    }
  }
}

export default GetUsersService;
