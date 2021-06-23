import {
  FindByCodeDTO,
  UpdateIsValidByCodeDTO,
  UpdateCheckedAtAndUpdatedAtByCodeDTO,
  createDTO,
  UserLoginCode,
} from './dto';

export default interface IUserLoginCodeRepositoryRepository {
  findByCode(codeDTO: FindByCodeDTO): Promise<UserLoginCode | null>;
  invalidateUserLoginCodeByCode(
    codeDTO: UpdateIsValidByCodeDTO,
  ): Promise<UserLoginCode>;
  updateCheckedAtAndUpdatedAtByCode(
    codeDTO: UpdateCheckedAtAndUpdatedAtByCodeDTO,
  ): Promise<UserLoginCode>;
  create(codeDTO: createDTO): Promise<UserLoginCode>;
}
