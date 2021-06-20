import {
  CreateUserDTO,
  FindUserByEmailDTO,
  FindUserByUsernameDTO,
  User,
} from './dto';

interface IUsersRepository {
  createUser(user: CreateUserDTO): Promise<User>;
  FindUsersByUsername({ username }: FindUserByUsernameDTO): Promise<User[]>;
  FindUsersByEmail({ email }: FindUserByEmailDTO): Promise<User[]>;
  FindUserByUsername({ username }: FindUserByUsernameDTO): Promise<User | null>;
  FindUserByEmail({ email }: FindUserByEmailDTO): Promise<User | null>;
}

export default IUsersRepository;
