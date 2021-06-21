/* eslint-disable camelcase */
import HTTPStatusCode from 'http-status-codes';

import AppError from '../../app/errors/AppError';
import messages from '../../app/intl/messages/en-US';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '../../app/providers/IStorageProvider';

interface ExecuteDTO {
  username: string;
  description: string | null;
  birthDate: string;
  email: string;
  profilePhoto: string | null;
  coverPhoto: string | null;
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
  };
}

class RegisterUserService {
  private usersRepository: IUsersRepository;

  private storageProvider: IStorageProvider;

  constructor(
    usersRepository: IUsersRepository,
    storageProvider: IStorageProvider,
  ) {
    this.usersRepository = usersRepository;
    this.storageProvider = storageProvider;

    this.execute = this.execute.bind(this);
  }

  async execute({
    username,
    profilePhoto,
    email,
    description = null,
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

    let profilePhotoSaved = null;
    let coverPhotoSaved = null;
    if (profilePhoto) {
      profilePhotoSaved = await this.storageProvider.saveFile(profilePhoto);
    }

    if (coverPhoto) {
      coverPhotoSaved = await this.storageProvider.saveFile(coverPhoto);
    }

    const user = await this.usersRepository.createUser({
      username,
      profilePhoto: profilePhotoSaved,
      email,
      description,
      coverPhoto: coverPhotoSaved,
      birthDate,
    });

    return {
      user,
    };
  }
}

export default RegisterUserService;
