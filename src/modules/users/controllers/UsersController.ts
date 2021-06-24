/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import HTTPStatusCode from 'http-status-codes';

import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import IStorageProvider from '../../app/providers/IStorageProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import RegisterUserService from '../services/RegisterUserService';

class UsersController {
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

    this.store = this.store.bind(this);
  }

  async store(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const { birthDate, description, email, username } = req.body;
    const { files } = req;

    const filesUpload: Express.Multer.File[] = files as Express.Multer.File[];
    const [profilePhoto, coverPhoto] = filesUpload;

    const registerUserService = new RegisterUserService(
      this.usersRepository,
      this.storageProvider,
      this.databaseRepository,
    );
    const response = await registerUserService.execute({
      birthDate,
      coverPhoto: coverPhoto ? coverPhoto.filename : null,
      description,
      email,
      profilePhoto: profilePhoto ? profilePhoto.filename : null,
      username,
    });
    return res.status(HTTPStatusCode.CREATED).json(response);
  }
}

export default UsersController;
