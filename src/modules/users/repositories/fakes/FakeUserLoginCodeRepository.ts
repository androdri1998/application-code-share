/* eslint-disable camelcase */
import { v4 as uuidv4 } from 'uuid';

import IDatabase from '../../../app/db/IDatabase';
import {
  createDTO,
  FindByCodeDTO,
  UpdateCheckedAtAndUpdatedAtByCodeDTO,
  UpdateIsValidByCodeDTO,
  UserLoginCode,
} from '../dto';
import IUserLoginCodeRepositoryRepository from '../IUserLoginCodeRepository';

class FakeUsersRepository implements IUserLoginCodeRepositoryRepository {
  private database;

  private userLoginCodes: UserLoginCode[];

  constructor(database: IDatabase) {
    this.database = database;

    this.userLoginCodes = [];
  }

  async findByCode({ code }: FindByCodeDTO): Promise<UserLoginCode> {
    const userLoginCodeFound = this.userLoginCodes.find(
      userLoginCode => userLoginCode.code === code,
    );

    return userLoginCodeFound || null;
  }

  async invalidateUserLoginCodeByCode({
    code,
    is_valid,
  }: UpdateIsValidByCodeDTO): Promise<UserLoginCode> {
    const userLoginCodeIndex = this.userLoginCodes.findIndex(
      userLoginCode => userLoginCode.code === code,
    );

    const userLoginCode = this.userLoginCodes[userLoginCodeIndex];

    userLoginCode.is_valid = is_valid;

    this.userLoginCodes[userLoginCodeIndex] = userLoginCode;

    return userLoginCode || null;
  }

  async updateCheckedAtAndUpdatedAtByCode({
    code,
    updated_at,
    checked_at,
  }: UpdateCheckedAtAndUpdatedAtByCodeDTO): Promise<UserLoginCode> {
    const userLoginCodeIndex = this.userLoginCodes.findIndex(
      userLoginCode => userLoginCode.code === code,
    );

    const userLoginCode = this.userLoginCodes[userLoginCodeIndex];

    userLoginCode.updated_at = updated_at;
    userLoginCode.checked_at = checked_at;

    this.userLoginCodes[userLoginCodeIndex] = userLoginCode;

    return userLoginCode || null;
  }

  async create({
    user_id,
    checked_at,
    code,
    created_at,
    is_valid,
    updated_at,
  }: createDTO): Promise<UserLoginCode> {
    const userLoginCode = {
      id: uuidv4(),
      user_id,
      code,
      updated_at,
      checked_at,
      created_at,
      is_valid,
    };

    this.userLoginCodes.push(userLoginCode);

    return userLoginCode;
  }
}

export default FakeUsersRepository;
