/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import HTTPStatusCode from 'http-status-codes';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import ICodesRepository from '../repositories/ICodesRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';

import GetCodesService from '../services/GetCodesService';

class CodesByUserController {
  private usersRepository: IUsersRepository;

  private codesRepository: ICodesRepository;

  private databaseRepository: IDatabaseRepository;

  constructor(
    usersRepository: IUsersRepository,
    codesRepository: ICodesRepository,
    databaseRepository: IDatabaseRepository,
  ) {
    this.usersRepository = usersRepository;
    this.codesRepository = codesRepository;
    this.databaseRepository = databaseRepository;

    this.index = this.index.bind(this);
  }

  async index(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const { limit, page } = req.query;
    const { userId } = req.params;

    const getCodesService = new GetCodesService(
      this.usersRepository,
      this.codesRepository,
      this.databaseRepository,
    );

    const response = await getCodesService.execute({
      limit: limit ? parseInt(limit as string) : 10,
      page: page ? parseInt(page as string) : 0,
      userId,
    });

    return res.status(HTTPStatusCode.OK).json(response);
  }
}

export default CodesByUserController;
