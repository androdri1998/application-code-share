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

class FakeCodesRepository implements ICodesRepository {
  private database: IDatabase;

  private codes: Code[];

  constructor(database: IDatabase) {
    this.database = database;

    this.codes = [];
  }

  createCode({ code, userId }: CreateCodeDTO): Promise<Code> {
    throw new Error('Method not implemented.');
  }

  findCodesByUserId({ userId }: FindCodesByUserIdDTO): Promise<Code[]> {
    throw new Error('Method not implemented.');
  }

  findCodeById({ codeId }: FindCodeByIdDTO): Promise<Code> {
    throw new Error('Method not implemented.');
  }

  updateCodeById({ codeId, code }: UpdateCodeByIdDTO): Promise<Code> {
    throw new Error('Method not implemented.');
  }

  updateAvailableAtById({
    codeId,
    availableAt,
  }: UpdateAvailableAtByIdDTO): Promise<Code> {
    throw new Error('Method not implemented.');
  }

  updateIsValidById({ codeId, isValid }: UpdateIsValidByIdDTO): Promise<Code> {
    throw new Error('Method not implemented.');
  }
}

export default FakeCodesRepository;
