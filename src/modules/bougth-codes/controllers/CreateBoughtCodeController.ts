/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import HTTPStatusCode from 'http-status-codes';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import ICodesRepository from '../../codes/repositories/ICodesRepository';
import IBoughtCodesRepository from '../repositories/IBoughtCodesRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';

import CreateBoughtCodeSevice from '../services/CreateBoughtCodeSevice';

class CreateBoughtCodeController {
  private usersRepository: IUsersRepository;

  private codesRepository: ICodesRepository;

  private boughtCodesRepository: IBoughtCodesRepository;

  private databaseRepository: IDatabaseRepository;

  constructor(
    usersRepository: IUsersRepository,
    boughtCodesRepository: IBoughtCodesRepository,
    codesRepository: ICodesRepository,
    databaseRepository: IDatabaseRepository,
  ) {
    this.usersRepository = usersRepository;
    this.boughtCodesRepository = boughtCodesRepository;
    this.codesRepository = codesRepository;
    this.databaseRepository = databaseRepository;

    this.store = this.store.bind(this);
  }

  async store(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const { codeId } = req.params;
    const userId = req.user?.id;

    const createCodeService = new CreateBoughtCodeSevice(
      this.usersRepository,
      this.boughtCodesRepository,
      this.codesRepository,
      this.databaseRepository,
    );

    const response = await createCodeService.execute({
      codeId,
      buyer: userId,
    });

    return res.status(HTTPStatusCode.CREATED).json(response);
  }
}

export default CreateBoughtCodeController;
