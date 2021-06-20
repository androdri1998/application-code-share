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

class UsersRepository implements IUsersRepository {
  private database: IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }

  async FindUserByUsername({
    username,
  }: FindUserByUsernameDTO): Promise<User | null> {
    const values = [username];
    const responseUser = await this.database.query(
      `select * from users where username=$1;`,
      values,
    );

    const user = responseUser.results[0];

    return user || null;
  }

  async FindUserByEmail({ email }: FindUserByEmailDTO): Promise<User | null> {
    const values = [email];
    const responseUser = await this.database.query(
      `select * from users where email=$1;`,
      values,
    );

    const user = responseUser.results[0];

    return user || null;
  }

  async FindUsersByUsername({
    username,
  }: FindUserByUsernameDTO): Promise<User[]> {
    const usernameToSearch = `%${username}%`;
    const values = [usernameToSearch];
    const responseUsers = await this.database.query(
      `select * from users where username ilike $1;`,
      values,
    );

    const users = responseUsers.results;

    return users;
  }

  async FindUsersByEmail({ email }: FindUserByEmailDTO): Promise<User[]> {
    const emailToSearch = `%${email}%`;
    const values = [emailToSearch];
    const responseUsers = await this.database.query(
      `select * from users where email ilike $1;`,
      values,
    );

    const users = responseUsers.results;

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
