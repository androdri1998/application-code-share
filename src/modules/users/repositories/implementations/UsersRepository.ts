/* eslint-disable camelcase */
import { v4 as uuidv4 } from 'uuid';

import IDatabase from '../../../app/db/IDatabase';
import { generateCurrentDate } from '../../../app/utils/date';
import IUsersRepository from '../IUsersRepository';
import {
  CreateUserDTO,
  FindUserByEmailDTO,
  FindUserByIdDTO,
  FindUserByUsernameDTO,
  User,
} from '../dto';

class UsersRepository implements IUsersRepository {
  private database: IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }

  async findUserById({ userId }: FindUserByIdDTO): Promise<User | null> {
    const values = [userId];
    const responseUser = await this.database.query(
      `select * from users where id=$1;`,
      values,
    );

    const user = responseUser.results[0];

    return user || null;
  }

  async findUserByUsername({
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

  async findUserByEmail({ email }: FindUserByEmailDTO): Promise<User | null> {
    const values = [email];
    const responseUser = await this.database.query(
      `select * from users where email=$1;`,
      values,
    );

    const user = responseUser.results[0];

    return user || null;
  }

  async findUsersByUsername({
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

  async findUsersByEmail({ email }: FindUserByEmailDTO): Promise<User[]> {
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
    const createdAt = generateCurrentDate();
    const updatedAt = null;

    const user = {
      id: uuidv4(),
      username,
      description,
      birth_date: birthDate,
      email,
      profile_photo: profilePhoto,
      cover_photo: coverPhoto,
      created_at: createdAt,
      updated_at: updatedAt,
    };

    const values = [
      user.id,
      user.username,
      user.profile_photo,
      user.email,
      user.description,
      user.cover_photo,
      user.birth_date,
      createdAt,
      updatedAt,
    ];

    await this.database.query(
      `insert into
      users(id, username, profile_photo, email, description, cover_photo, birth_date, created_at, updated_at)
    values ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
      values,
    );

    return user;
  }
}

export default UsersRepository;
