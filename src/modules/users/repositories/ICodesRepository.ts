import {
  CreateCodeDTO,
  Code,
  FindCodesByUserIdDTO,
  FindCodeByIdDTO,
  UpdateCodeByIdDTO,
  UpdateAvailableAtByIdDTO,
  UpdateIsValidByIdDTO,
  FindCodesDTO,
} from './dto';

export default interface ICodesRepository {
  createCode({ code, userId }: CreateCodeDTO): Promise<Code>;
  findCodesByUserId({
    userId,
    limit,
    offset,
  }: FindCodesByUserIdDTO): Promise<Code[]>;
  findCodes({ limit, offset }: FindCodesDTO): Promise<Code[]>;
  findCodeById({ codeId }: FindCodeByIdDTO): Promise<Code | null>;
  updateCodeById({ codeId, code }: UpdateCodeByIdDTO): Promise<Code | null>;
  updateAvailableAtById({
    codeId,
    unavailableAt,
  }: UpdateAvailableAtByIdDTO): Promise<Code | null>;
  updateIsValidById({
    codeId,
    isValid,
  }: UpdateIsValidByIdDTO): Promise<Code | null>;
}
