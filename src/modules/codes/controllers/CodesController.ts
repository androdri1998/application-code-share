/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import HTTPStatusCode from 'http-status-codes';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import ICodesRepository from '../repositories/ICodesRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';

import CreateCodeService from '../services/CreateCodeService';

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
