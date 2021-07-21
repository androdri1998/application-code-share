/* eslint-disable camelcase */
import { v4 as uuidv4 } from 'uuid';

import IDatabase from '../../../app/db/IDatabase';
import { generateCurrentDate } from '../../../app/utils/date';
import IBoughtCodesRepository from '../IBoughtCodesRepository';
import {
  BoughtCode,
  CreateBoughtCodeDTO,
  FindBoughtCodeByIdDTO,
  FindBoughtCodesByBuyerIdDTO,
  FindBoughtCodesBySelletIdDTO,
  RemoveBoughtCodeDTO,
} from '../dto';

class BoughtCodesRepository implements IBoughtCodesRepository {
  private database: IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }

  async createCode({
    buyer,
    codeId,
    code,
    seller,
    unavailableAt,
  }: CreateBoughtCodeDTO): Promise<BoughtCode> {
    const createdAt = generateCurrentDate();
    const updatedAt = null;

    const boughtCodeValues = {
      id: uuidv4(),
      buyer,
      code,
      seller,
      code_id: codeId,
      unavailable_at: unavailableAt,
      created_at: createdAt,
      updated_at: updatedAt,
    };

    const values = [
      boughtCodeValues.id,
      boughtCodeValues.buyer,
      boughtCodeValues.seller,
      boughtCodeValues.code_id,
      boughtCodeValues.code,
      boughtCodeValues.unavailable_at,
      boughtCodeValues.created_at,
      boughtCodeValues.updated_at,
    ];

    await this.database.query(
      `insert into
      bought_codes(id, buyer, seller, code_id, code, unavailable_at, created_at, updated_at)
    values ($1, $2, $3, $4, $5, $6, $7, $8);`,
      values,
    );

    return boughtCodeValues;
  }

  async removeBoughtCode({
    boughtCodeId,
  }: RemoveBoughtCodeDTO): Promise<boolean> {
    const values = [boughtCodeId];
    await this.database.query(`delete from bought_codes where id=$1;`, values);

    const isDeleted = true;
    return isDeleted;
  }

  async findCodeById({
    boughtCodeId,
  }: FindBoughtCodeByIdDTO): Promise<BoughtCode> {
    const values = [boughtCodeId];
    const response = await this.database.query(
      `select * from bought_codes where id=$1;`,
      values,
    );

    const code = response.results[0];
    return code || null;
  }

  async findBoughtCodesByBuyerId({
    buyerId,
    limit,
    offset,
  }: FindBoughtCodesByBuyerIdDTO): Promise<BoughtCode[]> {
    const values = [buyerId, limit, offset];
    const response = await this.database.query(
      `select *
        from codes
        where buyer=$1
        limit $2 offset $3;`,
      values,
    );

    const boughtCodes = response.results;
    return boughtCodes;
  }

  async findBoughtCodesBySelletId({
    sellerId,
    limit,
    offset,
  }: FindBoughtCodesBySelletIdDTO): Promise<BoughtCode[]> {
    const values = [sellerId, limit, offset];
    const response = await this.database.query(
      `select *
        from codes
        where seller=$1
        limit $2 offset $3;`,
      values,
    );

    const boughtCodes = response.results;
    return boughtCodes;
  }
}

export default BoughtCodesRepository;
