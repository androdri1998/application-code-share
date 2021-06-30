import IDatabase from '../../app/db/IDatabase';
import IUsersRepository from '../repositories/IUsersRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IUserLoginCodeRepository from '../repositories/IUserLoginCodeRepository';
import FakeUserLoginCodeRepository from '../repositories/fakes/FakeUserLoginCodeRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import FakeDatabaseRepository from '../../app/repositories/fakes/FakeDatabaseRepository';
import RemoveUserService from './RemoveUserService';
import GetUserService from './GetUserService';
import AppError from '../../app/errors/AppError';

let fakeUsersRepository: IUsersRepository;
let fakeDatabaseRepository: IDatabaseRepository;
let fakeUserLoginCodeRepository: IUserLoginCodeRepository;
let removeUserService: RemoveUserService;
let getUserService: GetUserService;

describe('RemoveUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository({} as IDatabase);
    fakeDatabaseRepository = new FakeDatabaseRepository({} as IDatabase);
    fakeUserLoginCodeRepository = new FakeUserLoginCodeRepository(
      {} as IDatabase,
    );

    removeUserService = new RemoveUserService(
      fakeUsersRepository,
      fakeDatabaseRepository,
      fakeUserLoginCodeRepository,
    );

    getUserService = new GetUserService(
      fakeUsersRepository,
      fakeDatabaseRepository,
    );
  });

  it('should to be able to delete user', async () => {
    const user1 = {
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    };

    const userCreated = await fakeUsersRepository.createUser({
      birthDate: user1.birthDate,
      coverPhoto: user1.coverPhoto,
      description: user1.description,
      email: user1.email,
      profilePhoto: user1.profilePhoto,
      username: user1.username,
    });

    await removeUserService.execute({
      userId: userCreated.id,
    });

    await expect(
      getUserService.execute({
        userId: userCreated.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not to be able to remove user non-existent', async () => {
    await expect(
      getUserService.execute({
        userId: 'user-id-non-existent',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
