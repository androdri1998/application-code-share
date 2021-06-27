import IDatabase from '../../app/db/IDatabase';
import IUsersRepository from '../repositories/IUsersRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import FakeDatabaseRepository from '../../app/repositories/fakes/FakeDatabaseRepository';
import GetUserService from './GetUserService';
import AppError from '../../app/errors/AppError';

let fakeUsersRepository: IUsersRepository;
let fakeDatabaseRepository: IDatabaseRepository;
let getUserService: GetUserService;

describe('GetUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository({} as IDatabase);
    fakeDatabaseRepository = new FakeDatabaseRepository({} as IDatabase);

    getUserService = new GetUserService(
      fakeUsersRepository,
      fakeDatabaseRepository,
    );
  });

  it('should to be able to list user', async () => {
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

    const userDetailed = await getUserService.execute({
      userId: userCreated.id,
    });

    expect(userDetailed).toHaveProperty('user');
  });

  it('should not to be able to list user non-existent', async () => {
    await expect(
      getUserService.execute({
        userId: 'user-id-non-existent',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
