/* eslint-disable camelcase */
import { v4 as uuidv4 } from 'uuid';

import IDatabase from '../../../app/db/IDatabase';
import IUsersRepository from '../IUsersRepository';
import {
  CreateUserDTO,
  FindUserByEmailDTO,
  FindUserByUsernameDTO,
  User,
} from '../dto';

class FakeUsersRepository implements IUsersRepository {
  private database;

  private users: User[];

  constructor(database: IDatabase) {
    this.database = database;

    this.users = [];
  }

  async FindUserByUsername({
    username,
  }: FindUserByUsernameDTO): Promise<User | null> {
    const userFound = this.users.find(user => user.username === username);

    return userFound || null;
  }

  async FindUserByEmail({ email }: FindUserByEmailDTO): Promise<User | null> {
    const userFound = this.users.find(user => user.email === email);

    return userFound || null;
  }

  async FindUsersByUsername({
    username,
  }: FindUserByUsernameDTO): Promise<User[]> {
    const users = this.users.filter(user => user.username.includes(username));

    return users;
  }

  async FindUsersByEmail({ email }: FindUserByEmailDTO): Promise<User[]> {
    const users = this.users.filter(user => user.email.includes(email));

    return users;
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
