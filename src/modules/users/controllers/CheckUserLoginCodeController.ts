/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import HTTPStatusCode from 'http-status-codes';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import IUserLoginCodeRepository from '../repositories/IUserLoginCodeRepository';

import CheckUserLoginCodeService from '../services/CheckUserLoginCodeService';

class CheckUserLoginCodeController {
  private userLoginCodeRepository: IUserLoginCodeRepository;

  private databaseRepository: IDatabaseRepository;

  constructor(
    userLoginCodeRepository: IUserLoginCodeRepository,
    databaseRepository: IDatabaseRepository,
  ) {
    this.userLoginCodeRepository = userLoginCodeRepository;
    this.databaseRepository = databaseRepository;

    this.store = this.store.bind(this);
  }

  async store(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const { code } = req.body;
    const checkUserLoginCodeService = new CheckUserLoginCodeService(
      this.userLoginCodeRepository,
      this.databaseRepository,
    );
    const response = await checkUserLoginCodeService.execute({ code });
    return res.status(HTTPStatusCode.OK).json(response);
  }
}

export default CheckUserLoginCodeController;
