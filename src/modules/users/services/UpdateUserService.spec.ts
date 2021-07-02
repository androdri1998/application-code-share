import IDatabase from '../../app/db/IDatabase';
import AppError from '../../app/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IStorageProvider from '../../app/providers/IStorageProvider';
import FakeStorageProvider from '../../app/providers/fakes/FakeStorageProvider';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import FakeDatabaseRepository from '../../app/repositories/fakes/FakeDatabaseRepository';
import UpdateUserService from './UpdateUserService';

let fakeUsersRepository: IUsersRepository;
let fakeDatabaseRepository: IDatabaseRepository;
let fakeStorageProvider: IStorageProvider;
let updateUserService: UpdateUserService;

describe('UpdateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository({} as IDatabase);
    fakeDatabaseRepository = new FakeDatabaseRepository({} as IDatabase);
    fakeStorageProvider = new FakeStorageProvider();

    updateUserService = new UpdateUserService(
      fakeUsersRepository,
      fakeStorageProvider,
      fakeDatabaseRepository,
    );
  });

  it('should be able to update user', async () => {
    const user = {
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    };

    const userCreated = await fakeUsersRepository.createUser({
      birthDate: user.birthDate,
      coverPhoto: user.coverPhoto,
      description: user.description,
      email: user.email,
      profilePhoto: user.profilePhoto,
      username: user.username,
    });

    const userUpdated = await updateUserService.execute({
      userId: userCreated.id,
      birthDate: user.birthDate,
      coverPhoto: user.coverPhoto,
      description: user.description,
      email: user.email,
      profilePhoto: user.profilePhoto,
      username: 'some username',
    });

    expect(userUpdated.user.username).toBe('some username');
  });

  it('should not to be able to update a user non-existent', async () => {
    const user = {
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    };

    await expect(
      updateUserService.execute({
        userId: 'id-non-existent',
        birthDate: user.birthDate,
        coverPhoto: user.coverPhoto,
        description: user.description,
        email: user.email,
        profilePhoto: user.profilePhoto,
        username: user.username,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
