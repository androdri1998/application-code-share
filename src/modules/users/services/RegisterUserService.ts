/* eslint-disable camelcase */
import HTTPStatusCode from 'http-status-codes';

import AppError from '../../app/errors/AppError';
import messages from '../../app/intl/messages/en-US';
import IUsersRepository from '../repositories/IUsersRepository';

interface ExecuteDTO {
  username: string;
  description: string;
  birthDate: string;
  email: string;
  profilePhoto: string;
  coverPhoto: string;
}

interface ExecuteResponse {
  user: {
    id: string;
    username: string;
    description: string;
    birth_date: string;
    email: string;
    profile_photo: string;
    cover_photo: string;
  };
}

class RegisterUserService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({
    username,
    profilePhoto,
    email,
    description,
    coverPhoto,
    birthDate,
  }: ExecuteDTO): Promise<ExecuteResponse> {
    const userFoundByUsername = await this.usersRepository.FindUserByUsername({
      username,
    });
    const userFoundByEmail = await this.usersRepository.FindUserByEmail({
      email,
    });

    if (userFoundByUsername || userFoundByEmail) {
      throw new AppError(
        messages.errors.USER_ALREADY_EXISTS,
        HTTPStatusCode.CONFLICT,
      );
    }

    const user = await this.usersRepository.createUser({
      username,
      profilePhoto,
      email,
      description,
      coverPhoto,
      birthDate,
    });

    return {
      user,
    };
  }
}

export default RegisterUserService;
