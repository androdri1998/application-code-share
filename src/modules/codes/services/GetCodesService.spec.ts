import IDatabase from '../../app/db/IDatabase';
import ICodesRepository from '../repositories/ICodesRepository';
import FakeCodesRepository from '../repositories/fakes/FakeCodesRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import FakeDatabaseRepository from '../../app/repositories/fakes/FakeDatabaseRepository';
import GetCodesService from './GetCodesService';
import AppError from '../../app/errors/AppError';

let fakeUsersRepository: IUsersRepository;
let fakeCodesRepository: ICodesRepository;
let fakeDatabaseRepository: IDatabaseRepository;
let getCodesService: GetCodesService;

describe('GetCodesService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository({} as IDatabase);
    fakeDatabaseRepository = new FakeDatabaseRepository({} as IDatabase);
    fakeCodesRepository = new FakeCodesRepository({} as IDatabase);

    getCodesService = new GetCodesService(
      fakeUsersRepository,
      fakeCodesRepository,
      fakeDatabaseRepository,
    );
  });

  it('should to be able to list all codes', async () => {
    const code1 = {
      user_id: 'user1',
      code: 'teste-code',
      unavailable_at: '2021-07-12',
    };
    const code2 = {
      user_id: 'user2',
      code: 'teste-code',
      unavailable_at: '2021-07-12',
    };
    const code3 = {
      user_id: 'user3',
      code: 'teste-code',
      unavailable_at: '2021-07-12',
    };

    await fakeCodesRepository.createCode({
      userId: code1.user_id,
      code: code1.code,
      unavailableAt: code1.unavailable_at,
    });

    await fakeCodesRepository.createCode({
      userId: code2.user_id,
      code: code2.code,
      unavailableAt: code2.unavailable_at,
    });

    await fakeCodesRepository.createCode({
      userId: code3.user_id,
      code: code3.code,
      unavailableAt: code3.unavailable_at,
    });

    const users = await getCodesService.execute({
      limit: 2,
      page: 0,
    });

    expect(users.results.length).toBe(2);
  });

  it('should to be able to list all codes to one user', async () => {
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

    const code1 = {
      user_id: 'user1',
      code: 'teste-code',
      unavailable_at: '2021-07-12',
    };
    const code2 = {
      user_id: 'user2',
      code: 'teste-code',
      unavailable_at: '2021-07-12',
    };
    const code3 = {
      user_id: userCreated.id,
      code: 'teste-code',
      unavailable_at: '2021-07-12',
    };

    await fakeCodesRepository.createCode({
      userId: code1.user_id,
      code: code1.code,
      unavailableAt: code1.unavailable_at,
    });

    await fakeCodesRepository.createCode({
      userId: code2.user_id,
      code: code2.code,
      unavailableAt: code2.unavailable_at,
    });

    await fakeCodesRepository.createCode({
      userId: code3.user_id,
      code: code3.code,
      unavailableAt: code3.unavailable_at,
    });

    const users = await getCodesService.execute({
      userId: code3.user_id,
      limit: 2,
      page: 0,
    });

    expect(users.results.length).toBe(1);
  });

  it('should not to be able to list codes to one user-non-existent', async () => {
    const code1 = {
      user_id: 'user-non-existent',
      code: 'teste-code',
      unavailable_at: '2021-07-12',
    };

    await fakeCodesRepository.createCode({
      userId: code1.user_id,
      code: code1.code,
      unavailableAt: code1.unavailable_at,
    });

    await expect(
      getCodesService.execute({
        userId: code1.user_id,
        limit: 2,
        page: 0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should to be able to list all codes with pagination', async () => {
    const code1 = {
      user_id: 'user1',
      code: 'teste-code',
      unavailable_at: '2021-07-12',
    };
    const code2 = {
      user_id: 'user2',
      code: 'teste-code',
      unavailable_at: '2021-07-12',
    };
    const code3 = {
      user_id: 'user3',
      code: 'teste-code',
      unavailable_at: '2021-07-12',
    };

    await fakeCodesRepository.createCode({
      userId: code1.user_id,
      code: code1.code,
      unavailableAt: code1.unavailable_at,
    });

    await fakeCodesRepository.createCode({
      userId: code2.user_id,
      code: code2.code,
      unavailableAt: code2.unavailable_at,
    });

    await fakeCodesRepository.createCode({
      userId: code3.user_id,
      code: code3.code,
      unavailableAt: code3.unavailable_at,
    });

    const users = await getCodesService.execute({
      limit: 2,
      page: 1,
    });

    expect(users.results.length).toBe(1);
  });
});
