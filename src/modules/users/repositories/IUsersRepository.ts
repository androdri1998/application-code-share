import {
  CreateUserDTO,
  FindUserByEmailDTO,
  FindUserByUsernameDTO,
  User,
  FindUserByIdDTO,
  FindUsersByUsernameDTO,
  FindUsersByEmailDTO,
} from './dto';

export default interface IUsersRepository {
  createUser(user: CreateUserDTO): Promise<User>;
  findUsersByUsername({
    username,
    limit,
    offset,
  }: FindUsersByUsernameDTO): Promise<User[]>;
  findUsersByEmail({
    email,
    limit,
    offset,
  }: FindUsersByEmailDTO): Promise<User[]>;
  findUserByUsername({ username }: FindUserByUsernameDTO): Promise<User | null>;
  findUserByEmail({ email }: FindUserByEmailDTO): Promise<User | null>;
  findUserById({ userId }: FindUserByIdDTO): Promise<User | null>;
}
