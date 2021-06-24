/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import HTTPStatusCode from 'http-status-codes';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import IUserLoginCodeRepository from '../repositories/IUserLoginCodeRepository';
import IUsersRepository from '../repositories/IUsersRepository';

import GenerateUserLoginCodeService from '../services/GenerateUserLoginCodeService';

class GenerateUserLoginCodeController {
  private usersRepository: IUsersRepository;

  private userLoginCodeRepository: IUserLoginCodeRepository;

  private databaseRepository: IDatabaseRepository;

  constructor(
    usersRepository: IUsersRepository,
    userLoginCodeRepository: IUserLoginCodeRepository,
    databaseRepository: IDatabaseRepository,
  ) {
    this.usersRepository = usersRepository;
    this.userLoginCodeRepository = userLoginCodeRepository;
    this.databaseRepository = databaseRepository;

    this.store = this.store.bind(this);
  }

  async store(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const { email } = req.body;
    const generateUserLoginCodeService = new GenerateUserLoginCodeService(
      this.usersRepository,
      this.userLoginCodeRepository,
      this.databaseRepository,
    );
    const response = await generateUserLoginCodeService.execute({ email });
    return res.status(HTTPStatusCode.OK).json(response);
  }
}

export default GenerateUserLoginCodeController;
