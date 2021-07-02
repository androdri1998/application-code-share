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
  UpdateAvailableAtByIdDTO,
  UpdateCodeByIdDTO,
  UpdateIsValidByIdDTO,
} from '../dto';

class CodesRepository implements ICodesRepository {
  private database: IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }

  async createCode({ code, userId }: CreateCodeDTO): Promise<Code> {
    throw new Error('Method not implemented.');
  }

  async findCodesByUserId({ userId }: FindCodesByUserIdDTO): Promise<Code[]> {
    throw new Error('Method not implemented.');
  }

  async findCodeById({ codeId }: FindCodeByIdDTO): Promise<Code> {
    throw new Error('Method not implemented.');
  }

  async updateCodeById({ codeId, code }: UpdateCodeByIdDTO): Promise<Code> {
    throw new Error('Method not implemented.');
  }

  async updateAvailableAtById({
    codeId,
    availableAt,
  }: UpdateAvailableAtByIdDTO): Promise<Code> {
    throw new Error('Method not implemented.');
  }

  async updateIsValidById({
    codeId,
    isValid,
  }: UpdateIsValidByIdDTO): Promise<Code> {
    throw new Error('Method not implemented.');
  }
}

export default CodesRepository;
