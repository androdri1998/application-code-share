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
  FindUsersByEmailDTO,
  FindUsersByUsernameDTO,
  RemoveUserByIdDTO,
  UpdateUserByIdDTO,
} from '../dto';

class UsersRepository implements IUsersRepository {
  private database: IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }

  async updateUserById({
    userId,
    username,
    description,
    birthDate,
    email,
    profilePhoto,
    coverPhoto,
  }: UpdateUserByIdDTO): Promise<User | null> {
    const updatedAt = generateCurrentDate();

    const user = {
      id: userId,
      username,
      description,
      birth_date: birthDate,
      email,
      profile_photo: profilePhoto,
      cover_photo: coverPhoto,
      updated_at: updatedAt,
    };

    const values = [
      user.username,
      user.profile_photo,
      user.email,
      user.description,
      user.cover_photo,
      user.birth_date,
      updatedAt,
      user.id,
    ];

    await this.database.query(
      `update users
        set username=$1, profile_photo=$2, email=$3, description=$4, cover_photo=$5, birth_date=$6, updated_at=$7
        where id=$8`,
      values,
    );

    const userUpdated = this.findUserById({ userId });

    return userUpdated;
  }

  async removeUserById({ userId }: RemoveUserByIdDTO): Promise<boolean> {
    const values = [userId];
    await this.database.query(`delete from users where id=$1;`, values);
    const isDeleted = true;
    return isDeleted;
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
    username = '',
    limit = 10,
    offset = 0,
  }: FindUsersByUsernameDTO): Promise<User[]> {
    const usernameToSearch = `%${username}%`;
    const values = [usernameToSearch, limit, offset];
    const responseUsers = await this.database.query(
      `select * from users where username ilike $1 limit $2 offset $3;`,
      values,
    );

    const users = responseUsers.results;

    return users;
  }

  async findUsersByEmail({
    email = '',
    limit = 10,
    offset = 0,
  }: FindUsersByEmailDTO): Promise<User[]> {
    const emailToSearch = `%${email}%`;
    const values = [emailToSearch, limit, offset];
    const responseUsers = await this.database.query(
      `select * from users where email ilike $1 limit $2 offset $3;`,
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
