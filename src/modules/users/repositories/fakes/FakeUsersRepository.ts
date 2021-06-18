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

interface User {
  id: string;
  username: string;
  description: string;
  birth_date: string;
  email: string;
  profile_photo: string;
  cover_photo: string;
}

class FakeUsersRepository {
  private database;

  private users: User[];

  constructor(database: IDatabase) {
    this.database = database;

    this.users = [];
  }

  async createUser({
    birthDate,
    coverPhoto,
    description,
    email,
    profilePhoto,
    username,
  }: CreateUserDTO): Promise<User> {
    const user = {
      id: uuidv4(),
      username,
      description,
      birth_date: birthDate,
      email,
      profile_photo: profilePhoto,
      cover_photo: coverPhoto,
    };

    this.users.push(user);

    return user;
  }
}

export default FakeUsersRepository;
