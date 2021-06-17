/* eslint-disable camelcase */
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

interface IUsersRepository {
  createUser(user: CreateUserDTO): Promise<CreateUserResponse>;
}

export default IUsersRepository;
