import IDatabase from '../../app/db/IDatabase';
import AppError from '../../app/errors/AppError';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import ICodesRepository from '../repositories/ICodesRepository';
import FakeCodesRepository from '../repositories/fakes/FakeCodesRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import FakeDatabaseRepository from '../../app/repositories/fakes/FakeDatabaseRepository';
import CreateCodeService from './CreateCodeService';

let fakeUsersRepository: IUsersRepository;
let fakeCodesRepository: ICodesRepository;
let fakeDatabaseRepository: IDatabaseRepository;
let createCodeService: CreateCodeService;

describe('CreateCodeService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository({} as IDatabase);
    fakeCodesRepository = new FakeCodesRepository({} as IDatabase);
    fakeDatabaseRepository = new FakeDatabaseRepository({} as IDatabase);

    createCodeService = new CreateCodeService(
      fakeUsersRepository,
      fakeCodesRepository,
      fakeDatabaseRepository,
    );
  });

  it('should be able to create a code', async () => {
    const userCreated = await fakeUsersRepository.createUser({
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'email@mailtest.com',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    });

    const codeCreated = await createCodeService.execute({
      userId: userCreated.id,
      code: 'example-code',
    });

    expect(codeCreated.code).toHaveProperty('id');
  });

  it("should be able to create a code with field 'available at'", async () => {
    const userCreated = await fakeUsersRepository.createUser({
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'email@mailtest.com',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    });

    const codeCreated = await createCodeService.execute({
      userId: userCreated.id,
      code: 'example-code',
      unavailableAt: '2021-07-12',
    });

    expect(codeCreated.code.unavailable_at).toBe('2021-07-12 23:59:59');
  });

  it('should not be able to create code with a user-non-existent', async () => {
    await expect(
      createCodeService.execute({
        userId: 'user-non-existent',
        code: 'example-code',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
