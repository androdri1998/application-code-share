/* eslint-disable camelcase */
import { v4 as uuidv4 } from 'uuid';
import { generateCurrentDate } from '../../../app/utils/date';

import IDatabase from '../../../app/db/IDatabase';
import {
  createDTO,
  FindByCodeDTO,
  GetUserLoginCodeValidAndNotCheckedByUserIdDTO,
  UpdateCheckedAtAndUpdatedAtByCodeDTO,
  UpdateIsValidByCodeDTO,
  UserLoginCode,
} from '../dto';
import IUserLoginCodeRepository from '../IUserLoginCodeRepository';

class UserLoginCodeRepository implements IUserLoginCodeRepository {
  private database: IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }

  async getUserLoginCodeValidAndNotCheckedByUserId({
    user_id,
  }: GetUserLoginCodeValidAndNotCheckedByUserIdDTO): Promise<UserLoginCode[]> {
    const values = [user_id];
    const { results: userLoginCodes } = await this.database.query(
      `select * from user_login_codes where user_id=$1 and is_valid=true and checked_at is null;`,
      values,
    );

    return userLoginCodes;
  }

  async findByCode({ code }: FindByCodeDTO): Promise<UserLoginCode> {
    const values = [code];
    const { results } = await this.database.query(
      `select * from user_login_codes where code=$1;`,
      values,
    );

    const userLoginCode = results[0];

    return userLoginCode || null;
  }

  async invalidateUserLoginCodeByCode({
    code,
    is_valid,
  }: UpdateIsValidByCodeDTO): Promise<UserLoginCode> {
    const values = [is_valid, code];
    await this.database.query(
      `update user_login_codes set is_valid = $1, updated_at=now() where code = $2;`,
      values,
    );

    const userLoginCode = await this.findByCode({ code });

    return userLoginCode;
  }

  async updateCheckedAtAndUpdatedAtByCode({
    code,
  }: UpdateCheckedAtAndUpdatedAtByCodeDTO): Promise<UserLoginCode> {
    const values = [code];
    await this.database.query(
      `update user_login_codes set checked_at = now(), updated_at = now() where code = $1;`,
      values,
    );

    const userLoginCode = await this.findByCode({ code });

    return userLoginCode;
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
    const values = [
      userLoginCode.id,
      userLoginCode.user_id,
      userLoginCode.code,
      userLoginCode.is_valid,
      userLoginCode.checked_at,
      userLoginCode.created_at,
      userLoginCode.updated_at,
    ];
    await this.database.query(
      `insert into user_login_codes(id, user_id, code, is_valid, checked_at, created_at, updated_at)
      values($1, $2, $3, $4, $5, $6, $7);`,
      values,
    );

    return userLoginCode;
  }
}

export default UserLoginCodeRepository;
