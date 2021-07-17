/* eslint-disable camelcase */
import { v4 as uuidv4 } from 'uuid';

import IDatabase from '../../../app/db/IDatabase';
import { generateCurrentDate } from '../../../app/utils/date';
import ICodesRepository from '../ICodesRepository';
import {
  Code,
  CreateCodeDTO,
  FindCodeByIdDTO,
  FindCodesByUserIdDTO,
  RemoveCodeByIdDTO,
  UpdateAvailableAtByIdDTO,
  UpdateCodeByIdDTO,
  UpdateIsValidByIdDTO,
} from '../dto';

class CodesRepository implements ICodesRepository {
  private database: IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }

  async removeCodeById({ codeId }: RemoveCodeByIdDTO): Promise<boolean> {
    const values = [codeId];
    await this.database.query(
      `delete from codes where id=$1 and is_valid=true;`,
      values,
    );

    const isDeleted = true;
    return isDeleted;
  }

  async createCode({
    code,
    userId,
    unavailableAt,
  }: CreateCodeDTO): Promise<Code> {
    const createdAt = generateCurrentDate();
    const updatedAt = null;

    const codeValues = {
      id: uuidv4(),
      user_id: userId,
      code,
      is_valid: true,
      unavailable_at: unavailableAt ? `${unavailableAt} 23:59:59` : null,
      created_at: createdAt,
      updated_at: updatedAt,
    };

    const values = [
      codeValues.id,
      codeValues.user_id,
      codeValues.code,
      codeValues.is_valid,
      codeValues.unavailable_at,
      codeValues.created_at,
      codeValues.updated_at,
    ];

    await this.database.query(
      `insert into
      codes(id, user_id, code, is_valid, unavailable_at, created_at, updated_at)
    values ($1, $2, $3, $4, $5, $6, $7);`,
      values,
    );

    return codeValues;
  }

  async findCodesByUserId({
    userId,
    limit = 10,
    offset = 0,
  }: FindCodesByUserIdDTO): Promise<Code[]> {
    const values = [userId, limit, offset];
    const response = await this.database.query(
      `select *
        from codes
        where user_id=$1 and is_valid=true
        limit $2 offset $3;`,
      values,
    );

    const codes = response.results;
    return codes;
  }

  async findCodes({
    limit = 10,
    offset = 0,
  }: FindCodesByUserIdDTO): Promise<Code[]> {
    const values = [limit, offset];
    const response = await this.database.query(
      `select *
        from codes
        where is_valid=true
        limit $1 offset $2;`,
      values,
    );

    const codes = response.results;
    return codes;
  }

  async findCodeById({ codeId }: FindCodeByIdDTO): Promise<Code | null> {
    const values = [codeId];
    const response = await this.database.query(
      `select * from codes where id=$1 and is_valid=true;`,
      values,
    );

    const code = response.results[0];
    return code || null;
  }

  async updateCodeById({
    codeId,
    code,
  }: UpdateCodeByIdDTO): Promise<Code | null> {
    const updatedAt = generateCurrentDate();
    const values = [code, updatedAt, codeId];

    await this.database.query(
      `update codes
        set code=$1, updated_at=$2
        where id=$3`,
      values,
    );

    const codeUpdated = this.findCodeById({ codeId });

    return codeUpdated;
  }

  async updateAvailableAtById({
    codeId,
    unavailableAt,
  }: UpdateAvailableAtByIdDTO): Promise<Code | null> {
    const updatedAt = generateCurrentDate();
    const values = [unavailableAt, updatedAt, codeId];

    await this.database.query(
      `update codes
        set unavailable_at=$1, updated_at=$2
        where id=$3`,
      values,
    );

    const codeUpdated = this.findCodeById({ codeId });

    return codeUpdated;
  }

  async updateIsValidById({
    codeId,
    isValid,
  }: UpdateIsValidByIdDTO): Promise<Code | null> {
    const updatedAt = generateCurrentDate();
    const values = [isValid, updatedAt, codeId];

    await this.database.query(
      `update codes
        set is_valid=$1, updated_at=$2
        where id=$3`,
      values,
    );

    const codeUpdated = this.findCodeById({ codeId });

    return codeUpdated;
  }
}

export default CodesRepository;
