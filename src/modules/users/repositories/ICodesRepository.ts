import {
  CreateCodeDTO,
  Code,
  FindCodesByUserIdDTO,
  FindCodeByIdDTO,
  UpdateCodeByIdDTO,
  UpdateAvailableAtByIdDTO,
  UpdateIsValidByIdDTO,
} from './dto';

export default interface ICodesRepository {
  createCode({ code, userId }: CreateCodeDTO): Promise<Code>;
  findCodesByUserId({ userId }: FindCodesByUserIdDTO): Promise<Code[]>;
  findCodeById({ codeId }: FindCodeByIdDTO): Promise<Code>;
  updateCodeById({ codeId, code }: UpdateCodeByIdDTO): Promise<Code>;
  updateAvailableAtById({
    codeId,
    availableAt,
  }: UpdateAvailableAtByIdDTO): Promise<Code>;
  updateIsValidById({ codeId, isValid }: UpdateIsValidByIdDTO): Promise<Code>;
}
