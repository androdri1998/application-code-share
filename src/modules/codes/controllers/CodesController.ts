/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import HTTPStatusCode from 'http-status-codes';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import ICodesRepository from '../repositories/ICodesRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';

import CreateCodeService from '../services/CreateCodeService';
import GetCodesService from '../services/GetCodesService';
import GetCodeService from '../services/GetCodeService';

class CodesController {
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

    this.store = this.store.bind(this);
    this.index = this.index.bind(this);
    this.get = this.get.bind(this);
  }

  async get(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const { codeId } = req.params;

    const getCodeService = new GetCodeService(
      this.codesRepository,
      this.databaseRepository,
    );

    const response = await getCodeService.execute({
      codeId,
    });

    return res.status(HTTPStatusCode.OK).json(response);
  }

  async index(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const { limit, page } = req.query;

    const getCodesService = new GetCodesService(
      this.usersRepository,
      this.codesRepository,
      this.databaseRepository,
    );

    const response = await getCodesService.execute({
      limit: limit ? parseInt(limit as string) : 10,
      page: page ? parseInt(page as string) : 0,
    });

    return res.status(HTTPStatusCode.OK).json(response);
  }

  async store(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const { code, unavailable_at: unavailableAt } = req.body;
    const userId = req.user?.id;

    const createCodeService = new CreateCodeService(
      this.usersRepository,
      this.codesRepository,
      this.databaseRepository,
    );

    const response = await createCodeService.execute({
      code,
      unavailableAt,
      userId,
    });

    return res.status(HTTPStatusCode.CREATED).json(response);
  }
}

export default CodesController;
