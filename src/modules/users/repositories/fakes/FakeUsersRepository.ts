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

class FakeUsersRepository implements IUsersRepository {
  private database;

  private users: User[];

  constructor(database: IDatabase) {
    this.database = database;

    this.users = [];
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
    const userToUpdateIndex = this.users.findIndex(
      userToFind => userToFind.id === userId,
    );

    const userToUpdateObject = this.users[userToUpdateIndex];
    this.users[userToUpdateIndex] = {
      ...user,
      created_at: userToUpdateObject.created_at,
    };

    const userUpdated = this.findUserById({ userId });

    return userUpdated;
  }

  async removeUserById({ userId }: RemoveUserByIdDTO): Promise<boolean> {
    const users = this.users.filter(user => user.id !== userId);
    this.users = users;
    const isDeleted = true;

    return isDeleted;
  }

  async findUserById({ userId }: FindUserByIdDTO): Promise<User | null> {
    const userFound = this.users.find(user => user.id === userId);

    return userFound || null;
  }

  async findUserByUsername({
    username,
  }: FindUserByUsernameDTO): Promise<User | null> {
    const userFound = this.users.find(user => user.username === username);

    return userFound || null;
  }

  async findUserByEmail({ email }: FindUserByEmailDTO): Promise<User | null> {
    const userFound = this.users.find(user => user.email === email);

    return userFound || null;
  }

  async findUsersByUsername({
    username = '',
    limit = 10,
    offset = 0,
  }: FindUsersByUsernameDTO): Promise<User[]> {
    const users = this.users.filter(user => user.username.includes(username));
    const newLimit = offset + limit;
    return users.slice(offset, newLimit);
  }

  async findUsersByEmail({
    email = '',
    limit = 10,
    offset = 0,
  }: FindUsersByEmailDTO): Promise<User[]> {
    const users = this.users.filter(user => user.email.includes(email));
    const newLimit = offset + limit;
    return users.slice(offset, newLimit);
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

    this.users.push(user);

    return user;
  }
}

export default FakeUsersRepository;
