import {
  CreateUserDTO,
  FindUserByEmailDTO,
  FindUserByUsernameDTO,
  User,
  FindUserByIdDTO,
} from './dto';

export default interface IUsersRepository {
  createUser(user: CreateUserDTO): Promise<User>;
  findUsersByUsername({ username }: FindUserByUsernameDTO): Promise<User[]>;
  findUsersByEmail({ email }: FindUserByEmailDTO): Promise<User[]>;
  findUserByUsername({ username }: FindUserByUsernameDTO): Promise<User | null>;
  findUserByEmail({ email }: FindUserByEmailDTO): Promise<User | null>;
  findUserById({ userId }: FindUserByIdDTO): Promise<User | null>;
}
