import IDatabase from 'modules/app/db/IDatabase';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import RegisterUserService from './RegisterUserService';

let fakeUsersRepository: FakeUsersRepository;
let registerUserService: RegisterUserService;

describe('RegisterUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository({} as IDatabase);
    registerUserService = new RegisterUserService(fakeUsersRepository);
  });

  it('should be able to register user', async () => {
    const user = {
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    };

    const userCreated = await registerUserService.execute({
      birthDate: user.birthDate,
      coverPhoto: user.coverPhoto,
      description: user.description,
      email: user.email,
      profilePhoto: user.profilePhoto,
      username: user.username,
    });

    expect(userCreated.user).toHaveProperty('id');
  });
});
