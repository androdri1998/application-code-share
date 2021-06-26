import HTTPStatusCode from 'http-status-codes';

import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import AppError from '../../app/errors/AppError';
import messages from '../../app/intl/messages/en-US';
import IUserLoginCodeRepository from '../repositories/IUserLoginCodeRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface ExecuteDTO {
  email: string;
}

interface ExecuteResponse {
  message: string;
}

class GenerateUserLoginCodeService {
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

    this.execute = this.execute.bind(this);
  }

  async execute({ email }: ExecuteDTO): Promise<ExecuteResponse> {
    try {
      await this.databaseRepository.beginTransaction();
      const user = await this.usersRepository.findUserByEmail({
        email,
      });

      if (!user) {
        throw new AppError(
          messages.errors.USER_NOT_FOUND,
          HTTPStatusCode.NOT_FOUND,
        );
      }

      const userLoginCodes = await this.userLoginCodeRepository.getUserLoginCodeValidAndNotCheckedByUserId(
        {
          user_id: user.id,
        },
      );

      await Promise.all(
        userLoginCodes.map(async userLoginCode => {
          await this.userLoginCodeRepository.invalidateUserLoginCodeByCode({
            code: userLoginCode.code,
            is_valid: false,
          });
        }),
      );

      await this.userLoginCodeRepository.create({
        user_id: user.id,
      });

      await this.databaseRepository.commit();

      // TO-DO: should be able to send code by email

      return { message: messages.responses.GENERATE_USER_LOGIN_CODE };
    } catch (error) {
      await this.databaseRepository.rollback();
      throw error;
    }
  }
}

export default GenerateUserLoginCodeService;
