import {
  FindByCodeDTO,
  UpdateIsValidByCodeDTO,
  UpdateCheckedAtAndUpdatedAtByCodeDTO,
  createDTO,
  UserLoginCode,
  GetUserLoginCodeValidAndNotCheckedByUserIdDTO,
} from './dto';

export default interface IUserLoginCodeRepository {
  findByCode(codeDTO: FindByCodeDTO): Promise<UserLoginCode | null>;
  invalidateUserLoginCodeByCode(
    codeDTO: UpdateIsValidByCodeDTO,
  ): Promise<UserLoginCode>;
  updateCheckedAtAndUpdatedAtByCode(
    codeDTO: UpdateCheckedAtAndUpdatedAtByCodeDTO,
  ): Promise<UserLoginCode>;
  getUserLoginCodeValidAndNotCheckedByUserId(
    codeDTO: GetUserLoginCodeValidAndNotCheckedByUserIdDTO,
  ): Promise<UserLoginCode[]>;
  create(codeDTO: createDTO): Promise<UserLoginCode>;
}
