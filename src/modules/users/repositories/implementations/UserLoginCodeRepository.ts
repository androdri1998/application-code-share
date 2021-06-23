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

class UserLoginCodeRepository implements IUserLoginCodeRepositoryRepository {
  private database: IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
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
      `update user_login_codes set is_valid = $1 where code = $2;`,
      values,
    );

    const userLoginCode = await this.findByCode({ code });

    return userLoginCode;
  }

  async updateCheckedAtAndUpdatedAtByCode({
    code,
    checked_at,
    updated_at,
  }: UpdateCheckedAtAndUpdatedAtByCodeDTO): Promise<UserLoginCode> {
    const values = [checked_at, updated_at, code];
    await this.database.query(
      `update user_login_codes set checked_at = $1, updated_at = $2 where code = $3;`,
      values,
    );

    const userLoginCode = await this.findByCode({ code });

    return userLoginCode;
  }

  async create({
    code,
    user_id,
    updated_at,
    checked_at,
    created_at,
    is_valid,
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
