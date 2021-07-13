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
  FindCodesDTO,
  UpdateAvailableAtByIdDTO,
  UpdateCodeByIdDTO,
  UpdateIsValidByIdDTO,
} from '../dto';

class FakeCodesRepository implements ICodesRepository {
  private database: IDatabase;

  private codes: Code[];

  constructor(database: IDatabase) {
    this.database = database;

    this.codes = [];
  }

  async findCodes({ limit = 10, offset = 0 }: FindCodesDTO): Promise<Code[]> {
    const newLimit = offset + limit;
    const codes = this.codes.slice(offset, newLimit);
    return codes;
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

    this.codes.push(codeValues);

    return codeValues;
  }

  async findCodesByUserId({
    userId,
    limit = 10,
    offset = 0,
  }: FindCodesByUserIdDTO): Promise<Code[]> {
    const codes = this.codes.filter(code => code.user_id === userId);
    const newLimit = offset + limit;
    return codes.slice(offset, newLimit);
  }

  async findCodeById({ codeId }: FindCodeByIdDTO): Promise<Code | null> {
    const codeFound = this.codes.find(code => code.id === codeId);
    return codeFound || null;
  }

  async updateCodeById({
    codeId,
    code,
  }: UpdateCodeByIdDTO): Promise<Code | null> {
    const updatedAt = generateCurrentDate();

    const codeToUpdateIndex = this.codes.findIndex(
      codeToFind => codeToFind.id === codeId,
    );

    const codeToUpdateObject = this.codes[codeToUpdateIndex];
    this.codes[codeToUpdateIndex] = {
      ...codeToUpdateObject,
      code,
      updated_at: updatedAt,
    };

    const codeUpdated = this.findCodeById({ codeId });

    return codeUpdated;
  }

  async updateAvailableAtById({
    codeId,
    unavailableAt,
  }: UpdateAvailableAtByIdDTO): Promise<Code | null> {
    const updatedAt = generateCurrentDate();

    const codeToUpdateIndex = this.codes.findIndex(
      codeToFind => codeToFind.id === codeId,
    );

    const codeToUpdateObject = this.codes[codeToUpdateIndex];
    this.codes[codeToUpdateIndex] = {
      ...codeToUpdateObject,
      unavailable_at: unavailableAt,
      updated_at: updatedAt,
    };

    const codeUpdated = this.findCodeById({ codeId });

    return codeUpdated;
  }

  async updateIsValidById({
    codeId,
    isValid,
  }: UpdateIsValidByIdDTO): Promise<Code | null> {
    const updatedAt = generateCurrentDate();

    const codeToUpdateIndex = this.codes.findIndex(
      codeToFind => codeToFind.id === codeId,
    );

    const codeToUpdateObject = this.codes[codeToUpdateIndex];
    this.codes[codeToUpdateIndex] = {
      ...codeToUpdateObject,
      is_valid: isValid,
      updated_at: updatedAt,
    };

    const codeUpdated = this.findCodeById({ codeId });

    return codeUpdated;
  }
}

export default FakeCodesRepository;
