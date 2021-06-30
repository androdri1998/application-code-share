/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import HTTPStatusCode from 'http-status-codes';

import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import IStorageProvider from '../../app/providers/IStorageProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserLoginCodeRepository from '../repositories/IUserLoginCodeRepository';
import RegisterUserService from '../services/RegisterUserService';
import GetUsersService from '../services/GetUsersService';
import GetUserService from '../services/GetUserService';
import RemoveUserService from '../services/RemoveUserService';

class UsersController {
  private usersRepository: IUsersRepository;

  private userLoginCodeRepository: IUserLoginCodeRepository;

  private storageProvider: IStorageProvider;

  private databaseRepository: IDatabaseRepository;

  constructor(
    usersRepository: IUsersRepository,
    userLoginCodeRepository: IUserLoginCodeRepository,
    storageProvider: IStorageProvider,
    databaseRepository: IDatabaseRepository,
  ) {
    this.usersRepository = usersRepository;
    this.userLoginCodeRepository = userLoginCodeRepository;
    this.storageProvider = storageProvider;
    this.databaseRepository = databaseRepository;

    this.store = this.store.bind(this);
    this.index = this.index.bind(this);
    this.get = this.get.bind(this);
    this.destroy = this.destroy.bind(this);
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

  async index(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const { username, limit, page } = req.query;

    const getUsersService = new GetUsersService(
      this.usersRepository,
      this.databaseRepository,
    );

    const response = await getUsersService.execute({
      username: username ? (username as string) : '',
      limit: limit ? parseInt(limit as string) : 10,
      page: page ? parseInt(page as string) : 0,
    });

    return res.status(HTTPStatusCode.OK).json(response);
  }

  async get(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const { userId } = req.params;

    const getUserService = new GetUserService(
      this.usersRepository,
      this.databaseRepository,
    );

    const response = await getUserService.execute({
      userId,
    });

    return res.status(HTTPStatusCode.OK).json(response);
  }

  async destroy(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const { userId } = req.params;

    const removeUserService = new RemoveUserService(
      this.usersRepository,
      this.databaseRepository,
      this.userLoginCodeRepository,
    );

    const response = await removeUserService.execute({
      userId,
    });

    return res.status(HTTPStatusCode.NO_CONTENT).json(response);
  }
}

export default UsersController;
