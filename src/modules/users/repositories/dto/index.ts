/* eslint-disable camelcase */
export interface CreateUserDTO {
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

export interface UserLoginCode {
  id: string;
  user_id: string;
  code: string;
  is_valid: boolean;
  checked_at: string;
  created_at: string;
  updated_at: string;
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
  checked_at: string;
  updated_at: string;
}

export interface createDTO {
  user_id: string;
  code: string;
  is_valid: boolean;
  checked_at: string;
  created_at: string;
  updated_at: string;
}
