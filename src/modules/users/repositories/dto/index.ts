/* eslint-disable camelcase */
export interface CreateUserDTO {
  username: string;
  description: string;
  birthDate: string;
  email: string;
  profilePhoto: string;
  coverPhoto: string;
}

export interface User {
  id: string;
  username: string;
  description: string;
  birth_date: string;
  email: string;
  profile_photo: string;
  cover_photo: string;
}

export interface FindUserByUsernameDTO {
  username: string;
}

export interface FindUserByEmailDTO {
  email: string;
}
