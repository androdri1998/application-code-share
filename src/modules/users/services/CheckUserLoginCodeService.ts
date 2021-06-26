import HTTPStatusCode from 'http-status-codes';
import { sign } from 'jsonwebtoken';

import appConfig from '../../../config/app';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import AppError from '../../app/errors/AppError';
import messages from '../../app/intl/messages/en-US';
import IUserLoginCodeRepository from '../repositories/IUserLoginCodeRepository';

interface ExecuteDTO {
  code: string;
}

interface ExecuteResponse {
  token: string;
}

class CheckUserLoginCodeController {
  private userLoginCodeRepository: IUserLoginCodeRepository;

  private databaseRepository: IDatabaseRepository;

  constructor(
    userLoginCodeRepository: IUserLoginCodeRepository,
    databaseRepository: IDatabaseRepository,
  ) {
    this.userLoginCodeRepository = userLoginCodeRepository;
    this.databaseRepository = databaseRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({ code }: ExecuteDTO): Promise<ExecuteResponse> {
    try {
      await this.databaseRepository.beginTransaction();

      const userLoginCode = await this.userLoginCodeRepository.findByCode({
        code,
      });

      if (!userLoginCode) {
        throw new AppError(
          messages.errors.CODE_NOT_FOUND,
          HTTPStatusCode.NOT_FOUND,
        );
      }

      if (userLoginCode.checked_at !== null || !userLoginCode.is_valid) {
        throw new AppError(
          messages.errors.CODE_IS_NOT_VALID,
          HTTPStatusCode.NOT_FOUND,
        );
      }

      await this.userLoginCodeRepository.updateCheckedAtAndUpdatedAtByCode({
        code,
      });

      await this.databaseRepository.commit();

      const { secret, expiresIn } = appConfig.jwt;
      const token = sign({}, secret as string, {
        subject: userLoginCode.user_id,
        expiresIn,
      });

      return { token };
    } catch (error) {
      await this.databaseRepository.rollback();
      throw error;
    }
  }
}

export default CheckUserLoginCodeController;
