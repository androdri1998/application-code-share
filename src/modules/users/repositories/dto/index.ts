/* eslint-disable camelcase */
export interface CreateUserDTO {
  username: string;
  description: string | null;
  birthDate: string;
  email: string;
  profilePhoto: string | null;
  coverPhoto: string | null;
}

export interface UpdateUserByIdDTO {
  userId: string;
  username: string;
  description: string | null;
  birthDate: string;
  email: string;
  profilePhoto: string | null;
  coverPhoto: string | null;
}

export interface User {
  id: string;
  username: string;
  description: string | null;
  birth_date: string;
  email: string;
  profile_photo: string | null;
  cover_photo: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface FindUserByUsernameDTO {
  username: string;
}

export interface FindUserByEmailDTO {
  email: string;
}

export interface FindUsersByUsernameDTO {
  username?: string;
  offset?: number;
  limit?: number;
}

export interface FindUsersByEmailDTO {
  email?: string;
  offset?: number;
  limit?: number;
}

export interface UserLoginCode {
  id: string;
  user_id: string;
  code: string;
  is_valid: boolean;
  checked_at: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface FindByCodeDTO {
  code: string;
}

export interface UpdateIsValidByCodeDTO {
  code: string;
  is_valid: boolean;
}

export interface UpdateCheckedAtAndUpdatedAtByCodeDTO {
  code: string;
}

export interface GetUserLoginCodeValidAndNotCheckedByUserIdDTO {
  user_id: string;
}

export interface createDTO {
  user_id: string;
}

export interface FindUserByIdDTO {
  userId: string;
}

export interface RemoveUserByIdDTO {
  userId: string;
}

export interface RemoveUserLoginCodesByUserIdDTO {
  userId: string;
}

export interface Code {
  id: string;
  user_id: string;
  code: string;
  is_valid: boolean;
  unavailable_at: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface CreateCodeDTO {
  userId: string;
  code: string;
  unavailableAt?: string;
}

export interface FindCodesByUserIdDTO {
  userId: string;
  limit?: number;
  offset?: number;
}

export interface FindCodesDTO {
  limit?: number;
  offset?: number;
}

export interface FindCodeByIdDTO {
  codeId: string;
}

export interface UpdateCodeByIdDTO {
  codeId: string;
  code: string;
}

export interface UpdateAvailableAtByIdDTO {
  codeId: string;
  unavailableAt: string;
}

export interface UpdateIsValidByIdDTO {
  codeId: string;
  isValid: boolean;
}
