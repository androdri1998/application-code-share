import IDatabase from '../../app/db/IDatabase';
import AppError from '../../app/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '../../app/providers/fakes/FakeStorageProvider';
import RegisterUserService from './RegisterUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let registerUserService: RegisterUserService;

describe('RegisterUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository({} as IDatabase);
    fakeStorageProvider = new FakeStorageProvider();
    registerUserService = new RegisterUserService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
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
    expect(userCreated.user.profile_photo).toBe(user.profilePhoto);
    expect(userCreated.user.cover_photo).toBe(user.coverPhoto);
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

  it('should be able to register user without a profile photo', async () => {
    const user = {
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email',
      profilePhoto: null,
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

    await expect(userCreated.user.profile_photo).toBe(null);
  });

  it('should be able to register user without a cover photo', async () => {
    const user = {
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email',
      profilePhoto: 'some profile photo',
      coverPhoto: null,
    };

    const userCreated = await registerUserService.execute({
      birthDate: user.birthDate,
      coverPhoto: user.coverPhoto,
      description: user.description,
      email: user.email,
      profilePhoto: user.profilePhoto,
      username: user.username,
    });

    await expect(userCreated.user.cover_photo).toBe(null);
  });

  it('should be able to register user without a cover photo and profile photo', async () => {
    const user = {
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email',
      profilePhoto: null,
      coverPhoto: null,
    };

    const userCreated = await registerUserService.execute({
      birthDate: user.birthDate,
      coverPhoto: user.coverPhoto,
      description: user.description,
      email: user.email,
      profilePhoto: user.profilePhoto,
      username: user.username,
    });

    await expect(userCreated.user.profile_photo).toBe(null);
    await expect(userCreated.user.cover_photo).toBe(null);
  });

  it('should be able to register user without a description', async () => {
    const user = {
      username: 'some name',
      description: null,
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

    await expect(userCreated.user.description).toBe(null);
  });
});
