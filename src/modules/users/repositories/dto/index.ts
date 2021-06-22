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
