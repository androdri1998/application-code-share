/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import HTTPStatusCode from 'http-status-codes';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import IBoughtCodesRepository from '../repositories/IBoughtCodesRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';

import GetBoughtCodesByBuyerService from '../services/GetBoughtCodesByBuyerService';

class GetBoughtCodesByBuyerController {
  private usersRepository: IUsersRepository;

  private boughtCodesRepository: IBoughtCodesRepository;

  private databaseRepository: IDatabaseRepository;

  constructor(
    usersRepository: IUsersRepository,
    boughtCodesRepository: IBoughtCodesRepository,
    databaseRepository: IDatabaseRepository,
  ) {
    this.usersRepository = usersRepository;
    this.boughtCodesRepository = boughtCodesRepository;
    this.databaseRepository = databaseRepository;

    this.index = this.index.bind(this);
  }

  async index(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const { limit, page } = req.query;
    const userId = req.user?.id;

    const getBoughtCodesByBuyerService = new GetBoughtCodesByBuyerService(
      this.usersRepository,
      this.boughtCodesRepository,
      this.databaseRepository,
    );

    const response = await getBoughtCodesByBuyerService.execute({
      buyerId: userId,
      limit: limit ? parseInt(limit as string) : 10,
      page: page ? parseInt(page as string) : 0,
    });

    return res.status(HTTPStatusCode.OK).json(response);
  }
}

export default GetBoughtCodesByBuyerController;
