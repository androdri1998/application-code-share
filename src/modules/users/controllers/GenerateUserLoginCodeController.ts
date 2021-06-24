/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import HTTPStatusCode from 'http-status-codes';
import IUserLoginCodeRepositoryRepository from '../repositories/IUserLoginCodeRepository';
import IUsersRepository from '../repositories/IUsersRepository';

import GenerateUserLoginCodeService from '../services/GenerateUserLoginCodeService';

class GenerateUserLoginCodeController {
  private usersRepository: IUsersRepository;

  private userLoginCodeRepository: IUserLoginCodeRepositoryRepository;

  constructor(
    usersRepository: IUsersRepository,
    userLoginCodeRepository: IUserLoginCodeRepositoryRepository,
  ) {
    this.usersRepository = usersRepository;
    this.userLoginCodeRepository = userLoginCodeRepository;

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
    );
    const response = await generateUserLoginCodeService.execute({ email });
    return res.status(HTTPStatusCode.OK).json(response);
  }
}

export default GenerateUserLoginCodeController;
