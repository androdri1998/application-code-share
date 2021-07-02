/* eslint-disable camelcase */
import HTTPStatusCode from 'http-status-codes';

import AppError from '../../app/errors/AppError';
import messages from '../../app/intl/messages/en-US';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '../../app/providers/IStorageProvider';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';

interface ExecuteDTO {
  userId: string;
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
    created_at: string;
    updated_at: string | null;
  };
}

class UpdateUserService {
  private usersRepository: IUsersRepository;

  private storageProvider: IStorageProvider;

  private databaseRepository: IDatabaseRepository;

  constructor(
    usersRepository: IUsersRepository,
    storageProvider: IStorageProvider,
    databaseRepository: IDatabaseRepository,
  ) {
    this.usersRepository = usersRepository;
    this.storageProvider = storageProvider;
    this.databaseRepository = databaseRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({
    userId,
    username,
    profilePhoto,
    email,
    description = null,
    coverPhoto,
    birthDate,
  }: ExecuteDTO): Promise<ExecuteResponse> {
    try {
      await this.databaseRepository.beginTransaction();

      const userFound = await this.usersRepository.findUserById({
        userId,
      });

      if (!userFound) {
        throw new AppError(
          messages.errors.USER_NOT_FOUND,
          HTTPStatusCode.NOT_FOUND,
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

      const user = await this.usersRepository.updateUserById({
        userId,
        username,
        profilePhoto: profilePhotoSaved,
        email,
        description,
        coverPhoto: coverPhotoSaved,
        birthDate,
      });

      if (!user) {
        throw new AppError(
          messages.errors.USER_NOT_FOUND,
          HTTPStatusCode.NOT_FOUND,
        );
      }

      await this.databaseRepository.commit();

      return {
        user,
      };
    } catch (error) {
      await this.databaseRepository.rollback();
      throw error;
    }
  }
}

export default UpdateUserService;
