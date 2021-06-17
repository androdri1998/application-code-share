/* eslint-disable camelcase */
import { v4 as uuidv4 } from 'uuid';

import IDatabase from '../../../app/db/IDatabase';

interface CreateUserDTO {
  username: string;
  description: string;
  birthDate: string;
  email: string;
  profilePhoto: string;
  coverPhoto: string;
}

interface CreateUserResponse {
  id: string;
  username: string;
  description: string;
  birth_date: string;
  email: string;
  profile_photo: string;
  cover_photo: string;
}

class UsersRepository {
  private database;

  constructor(database: IDatabase) {
    this.database = database;
  }

  async createUser({
    birthDate,
    coverPhoto,
    description,
    email,
    profilePhoto,
    username,
  }: CreateUserDTO): Promise<CreateUserResponse> {
    const user = {
      id: uuidv4(),
      username,
      description,
      birth_date: birthDate,
      email,
      profile_photo: profilePhoto,
      cover_photo: coverPhoto,
    };

    const values = [
      user.id,
      user.username,
      user.profile_photo,
      user.email,
      user.description,
      user.cover_photo,
      user.birth_date,
    ];

    await this.database.query(
      `insert into
      users(id, username, profile_photo, email, description, cover_photo, birth_date)
    values ($1, $2, $3, $4, $5, $6, $7);`,
      values,
    );

    return user;
  }
}

export default UsersRepository;
