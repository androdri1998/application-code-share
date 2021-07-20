import IDatabase from '../../app/db/IDatabase';
import ICodesRepository from '../repositories/ICodesRepository';
import FakeCodesRepository from '../repositories/fakes/FakeCodesRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import FakeDatabaseRepository from '../../app/repositories/fakes/FakeDatabaseRepository';
import UpdateUnavailableAtService from './UpdateUnavailableAtService';
import AppError from '../../app/errors/AppError';

let fakeUsersRepository: IUsersRepository;
let fakeCodesRepository: ICodesRepository;
let fakeDatabaseRepository: IDatabaseRepository;
let updateUnavailableAtService: UpdateUnavailableAtService;

describe('UpdateUnavailableAtService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository({} as IDatabase);
    fakeDatabaseRepository = new FakeDatabaseRepository({} as IDatabase);
    fakeCodesRepository = new FakeCodesRepository({} as IDatabase);

    updateUnavailableAtService = new UpdateUnavailableAtService(
      fakeUsersRepository,
      fakeCodesRepository,
      fakeDatabaseRepository,
    );
  });

  it('should to be able to update unavaiable at', async () => {
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

    const code = {
      user_id: userCreated.id,
      code: 'teste-code',
      unavailable_at: '2021-07-12',
    };

    const codeCreated = await fakeCodesRepository.createCode({
      userId: code.user_id,
      code: code.code,
      unavailableAt: code.unavailable_at,
    });

    const codeUpdated = await updateUnavailableAtService.execute({
      codeId: codeCreated.id,
      userId: code.user_id,
      unavailableAt: '2021-07-14',
    });

    expect(codeUpdated.code.unavailable_at).toBe('2021-07-14 23:59:59');
  });

  it('should to be able to update unavailable at to null', async () => {
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

    const code = {
      user_id: userCreated.id,
      code: 'teste-code',
      unavailable_at: '2021-07-12',
    };

    const codeCreated = await fakeCodesRepository.createCode({
      userId: code.user_id,
      code: code.code,
      unavailableAt: code.unavailable_at,
    });

    const codeUpdated = await updateUnavailableAtService.execute({
      codeId: codeCreated.id,
      userId: code.user_id,
      unavailableAt: null,
    });

    expect(codeUpdated.code.unavailable_at).toBe(null);
  });

  it('should not to be able to update available at from a code-non-existent', async () => {
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

    await expect(
      updateUnavailableAtService.execute({
        codeId: 'code-non-existent',
        userId: userCreated.id,
        unavailableAt: null,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not to be able to update unavailable at from a code with user-non-existent', async () => {
    const code = {
      user_id: 'user-non-existent',
      code: 'teste-code',
      unavailable_at: '2021-07-12',
    };

    const codeCreated = await fakeCodesRepository.createCode({
      userId: code.user_id,
      code: code.code,
      unavailableAt: code.unavailable_at,
    });

    await expect(
      updateUnavailableAtService.execute({
        codeId: codeCreated.id,
        userId: code.user_id,
        unavailableAt: null,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not to be able to update validate of a code from other user', async () => {
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

    const user1Created = await fakeUsersRepository.createUser({
      birthDate: user1.birthDate,
      coverPhoto: user1.coverPhoto,
      description: user1.description,
      email: user1.email,
      profilePhoto: user1.profilePhoto,
      username: user1.username,
    });

    const user2Created = await fakeUsersRepository.createUser({
      birthDate: user2.birthDate,
      coverPhoto: user2.coverPhoto,
      description: user2.description,
      email: user2.email,
      profilePhoto: user2.profilePhoto,
      username: user2.username,
    });

    const code = {
      user_id: user1Created.id,
      code: 'teste-code',
      unavailable_at: '2021-07-12',
    };

    const codeCreated = await fakeCodesRepository.createCode({
      userId: code.user_id,
      code: code.code,
      unavailableAt: code.unavailable_at,
    });

    await expect(
      updateUnavailableAtService.execute({
        codeId: codeCreated.id,
        userId: user2Created.id,
        unavailableAt: null,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
