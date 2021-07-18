import {
  CreateCodeDTO,
  Code,
  FindCodesByUserIdDTO,
  FindCodeByIdDTO,
  UpdateCodeByIdDTO,
  UpdateAvailableAtByIdDTO,
  UpdateIsValidByIdDTO,
  FindCodesDTO,
  RemoveCodeByIdDTO,
} from './dto';

export default interface ICodesRepository {
  createCode({ code, userId, unavailableAt }: CreateCodeDTO): Promise<Code>;
  findCodesByUserId({
    userId,
    limit,
    offset,
  }: FindCodesByUserIdDTO): Promise<Code[]>;
  findCodes({ limit, offset }: FindCodesDTO): Promise<Code[]>;
  findCodeById({ codeId }: FindCodeByIdDTO): Promise<Code | null>;
  findCodeByIdWithoutValidate({
    codeId,
  }: FindCodeByIdDTO): Promise<Code | null>;
  removeCodeById({ codeId }: RemoveCodeByIdDTO): Promise<boolean>;
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
