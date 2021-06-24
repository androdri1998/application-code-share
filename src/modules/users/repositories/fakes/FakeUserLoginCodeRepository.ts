/* eslint-disable camelcase */
import { v4 as uuidv4 } from 'uuid';

import IDatabase from '../../../app/db/IDatabase';
import { generateCurrentDate } from '../../../app/utils/date';
import {
  createDTO,
  FindByCodeDTO,
  GetUserLoginCodeValidAndNotCheckedByUserIdDTO,
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

  async getUserLoginCodeValidAndNotCheckedByUserId({
    user_id,
  }: GetUserLoginCodeValidAndNotCheckedByUserIdDTO): Promise<UserLoginCode[]> {
    const userLoginCodes = this.userLoginCodes.filter(
      userLoginCode =>
        userLoginCode.user_id === user_id &&
        userLoginCode.is_valid === true &&
        userLoginCode.checked_at === null,
    );

    return userLoginCodes;
  }

  async findByCode({ code }: FindByCodeDTO): Promise<UserLoginCode | null> {
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
    userLoginCode.updated_at = generateCurrentDate();

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

  async create({ user_id }: createDTO): Promise<UserLoginCode> {
    const userLoginCode = {
      id: uuidv4(),
      user_id,
      code: uuidv4(),
      updated_at: null,
      checked_at: null,
      created_at: generateCurrentDate(),
      is_valid: true,
    };

    this.userLoginCodes.push(userLoginCode);

    return userLoginCode;
  }
}

export default FakeUsersRepository;
