import IDatabase from '../../app/db/IDatabase';
import AppError from '../../app/errors/AppError';
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

  it('should not to be able to register user with a username existent', async () => {
    const user = {
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    };

    await registerUserService.execute({
      birthDate: user.birthDate,
      coverPhoto: user.coverPhoto,
      description: user.description,
      email: user.email,
      profilePhoto: user.profilePhoto,
      username: user.username,
    });

    await expect(
      registerUserService.execute({
        birthDate: user.birthDate,
        coverPhoto: user.coverPhoto,
        description: user.description,
        email: `${user.email}-diff`,
        profilePhoto: user.profilePhoto,
        username: user.username,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not to be able to register user with a email existent', async () => {
    const user = {
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    };

    await registerUserService.execute({
      birthDate: user.birthDate,
      coverPhoto: user.coverPhoto,
      description: user.description,
      email: user.email,
      profilePhoto: user.profilePhoto,
      username: user.username,
    });

    await expect(
      registerUserService.execute({
        birthDate: user.birthDate,
        coverPhoto: user.coverPhoto,
        description: user.description,
        email: user.email,
        profilePhoto: user.profilePhoto,
        username: `${user.username}-diff`,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
