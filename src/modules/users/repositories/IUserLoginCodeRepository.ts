import {
  FindByCodeDTO,
  UpdateIsValidByCodeDTO,
  UpdateCheckedAtAndUpdatedAtByCodeDTO,
  createDTO,
  UserLoginCode,
  GetUserLoginCodeValidAndNotCheckedByUserIdDTO,
  RemoveUserLoginCodesByUserIdDTO,
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
  removeUserLoginCodesByUserId(
    codeDTO: RemoveUserLoginCodesByUserIdDTO,
  ): Promise<boolean>;
  create(codeDTO: createDTO): Promise<UserLoginCode>;
}
