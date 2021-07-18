/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import HTTPStatusCode from 'http-status-codes';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import ICodesRepository from '../repositories/ICodesRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';

import UpdateValidateCodeService from '../services/UpdateValidateCodeService';

class UpdateValidateCodeController {
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

    this.update = this.update.bind(this);
  }

  async update(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const { codeId } = req.params;
    const { is_valid: isValid } = req.body;
    const userId = req.user?.id as string;

    const updateValidateCodeService = new UpdateValidateCodeService(
      this.usersRepository,
      this.codesRepository,
      this.databaseRepository,
    );

    const response = await updateValidateCodeService.execute({
      codeId,
      userId,
      isValid,
    });

    return res.status(HTTPStatusCode.OK).json(response);
  }
}

export default UpdateValidateCodeController;
