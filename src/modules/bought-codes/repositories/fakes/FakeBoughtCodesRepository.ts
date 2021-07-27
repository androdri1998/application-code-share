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

class FakeBoughtCodesRepository implements IBoughtCodesRepository {
  private database: IDatabase;

  private boughtCodes: BoughtCode[];

  constructor(database: IDatabase) {
    this.database = database;

    this.boughtCodes = [];
  }

  async createBoughtCode({
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

    this.boughtCodes.push(boughtCodeValues);

    return boughtCodeValues;
  }

  async removeBoughtCode({
    boughtCodeId,
  }: RemoveBoughtCodeDTO): Promise<boolean> {
    const newBoughtCodes = this.boughtCodes.filter(
      boughtCode => boughtCode.id !== boughtCodeId,
    );
    this.boughtCodes = newBoughtCodes;

    const isDeleted = true;
    return isDeleted;
  }

  async findBoughtCodeById({
    boughtCodeId,
  }: FindBoughtCodeByIdDTO): Promise<BoughtCode | null> {
    const boughtCodeFound = this.boughtCodes.find(
      boughtCode => boughtCode.id === boughtCodeId,
    );
    return boughtCodeFound || null;
  }

  async findBoughtCodesByBuyerId({
    buyerId,
    limit,
    offset,
  }: FindBoughtCodesByBuyerIdDTO): Promise<BoughtCode[]> {
    const codes = this.boughtCodes.filter(code => code.buyer === buyerId);
    const newLimit = offset + limit;
    return codes.slice(offset, newLimit);
  }

  async findBoughtCodesBySelletId({
    sellerId,
    limit,
    offset,
  }: FindBoughtCodesBySelletIdDTO): Promise<BoughtCode[]> {
    const codes = this.boughtCodes.filter(code => code.seller === sellerId);
    const newLimit = offset + limit;
    return codes.slice(offset, newLimit);
  }
}

export default FakeBoughtCodesRepository;
