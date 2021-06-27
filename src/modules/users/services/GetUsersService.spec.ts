import IDatabase from '../../app/db/IDatabase';
import IUsersRepository from '../repositories/IUsersRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import FakeDatabaseRepository from '../../app/repositories/fakes/FakeDatabaseRepository';
import GetUsersService from './GetUsersService';

let fakeUsersRepository: IUsersRepository;
let fakeDatabaseRepository: IDatabaseRepository;
let getUsersService: GetUsersService;

describe('GetUsersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository({} as IDatabase);
    fakeDatabaseRepository = new FakeDatabaseRepository({} as IDatabase);

    getUsersService = new GetUsersService(
      fakeUsersRepository,
      fakeDatabaseRepository,
    );
  });

  it('should to be able to list all users', async () => {
    const user1 = {
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    };

    const user2 = {
      username: 'some name 2',
      description: 'description 2',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email 2',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    };

    const user3 = {
      username: 'some name 3',
      description: 'description 3',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email 3',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    };

    await fakeUsersRepository.createUser({
      birthDate: user1.birthDate,
      coverPhoto: user1.coverPhoto,
      description: user1.description,
      email: user1.email,
      profilePhoto: user1.profilePhoto,
      username: user1.username,
    });

    await fakeUsersRepository.createUser({
      birthDate: user2.birthDate,
      coverPhoto: user2.coverPhoto,
      description: user2.description,
      email: user2.email,
      profilePhoto: user2.profilePhoto,
      username: user2.username,
    });

    await fakeUsersRepository.createUser({
      birthDate: user3.birthDate,
      coverPhoto: user3.coverPhoto,
      description: user3.description,
      email: user3.email,
      profilePhoto: user3.profilePhoto,
      username: user3.username,
    });

    const users = await getUsersService.execute({
      username: undefined,
      limit: 2,
      page: 0,
    });

    expect(users.results.length).toBe(2);
  });

  it('should to be able to list users with pagination', async () => {
    const user1 = {
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    };

    const user2 = {
      username: 'some name 2',
      description: 'description 2',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email 2',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    };

    const user3 = {
      username: 'some name 3',
      description: 'description 3',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email 3',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    };

    await fakeUsersRepository.createUser({
      birthDate: user1.birthDate,
      coverPhoto: user1.coverPhoto,
      description: user1.description,
      email: user1.email,
      profilePhoto: user1.profilePhoto,
      username: user1.username,
    });

    await fakeUsersRepository.createUser({
      birthDate: user2.birthDate,
      coverPhoto: user2.coverPhoto,
      description: user2.description,
      email: user2.email,
      profilePhoto: user2.profilePhoto,
      username: user2.username,
    });

    await fakeUsersRepository.createUser({
      birthDate: user3.birthDate,
      coverPhoto: user3.coverPhoto,
      description: user3.description,
      email: user3.email,
      profilePhoto: user3.profilePhoto,
      username: user3.username,
    });

    const users = await getUsersService.execute({
      username: '',
      limit: 2,
      page: 1,
    });

    expect(users.results.length).toBe(1);
  });

  it('should to be able to list users with search', async () => {
    const user1 = {
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    };

    const user2 = {
      username: 'some name 2',
      description: 'description 2',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email 2',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    };

    const user3 = {
      username: 'some name 3',
      description: 'description 3',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email 3',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    };

    await fakeUsersRepository.createUser({
      birthDate: user1.birthDate,
      coverPhoto: user1.coverPhoto,
      description: user1.description,
      email: user1.email,
      profilePhoto: user1.profilePhoto,
      username: user1.username,
    });

    await fakeUsersRepository.createUser({
      birthDate: user2.birthDate,
      coverPhoto: user2.coverPhoto,
      description: user2.description,
      email: user2.email,
      profilePhoto: user2.profilePhoto,
      username: user2.username,
    });

    await fakeUsersRepository.createUser({
      birthDate: user3.birthDate,
      coverPhoto: user3.coverPhoto,
      description: user3.description,
      email: user3.email,
      profilePhoto: user3.profilePhoto,
      username: user3.username,
    });

    const users = await getUsersService.execute({
      username: '2',
      limit: 2,
      page: 0,
    });

    expect(users.results.length).toBe(1);
  });
});
