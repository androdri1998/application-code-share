/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import HTTPStatusCode from 'http-status-codes';

import IUsersRepository from '../repositories/IUsersRepository';
import RegisterUserService from '../services/RegisterUserService';

class UsersController {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;

    this.store = this.store.bind(this);
  }

  async store(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const {
      birthDate,
      coverPhoto,
      description,
      email,
      profilePhoto,
      username,
    } = req.body;
    const registerUserService = new RegisterUserService(this.usersRepository);
    const response = await registerUserService.execute({
      birthDate,
      coverPhoto,
      description,
      email,
      profilePhoto,
      username,
    });
    return res.status(HTTPStatusCode.CREATED).json(response);
  }
}

export default UsersController;
