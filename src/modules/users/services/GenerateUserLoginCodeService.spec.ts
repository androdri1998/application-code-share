import IDatabase from '../../app/db/IDatabase';
import AppError from '../../app/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IUserLoginCodeRepository from '../repositories/IUserLoginCodeRepository';
import FakeUserLoginCodeRepository from '../repositories/fakes/FakeUserLoginCodeRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import FakeDatabaseRepository from '../../app/repositories/fakes/FakeDatabaseRepository';
import GenerateUserLoginCodeService from './GenerateUserLoginCodeService';

let fakeUsersRepository: IUsersRepository;
let fakeUserLoginCodeRepository: IUserLoginCodeRepository;
let fakeDatabaseRepository: IDatabaseRepository;
let generateUserLoginCodeService: GenerateUserLoginCodeService;

describe('RegisterUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository({} as IDatabase);
    fakeUserLoginCodeRepository = new FakeUserLoginCodeRepository(
      {} as IDatabase,
    );
    fakeDatabaseRepository = new FakeDatabaseRepository({} as IDatabase);

    generateUserLoginCodeService = new GenerateUserLoginCodeService(
      fakeUsersRepository,
      fakeUserLoginCodeRepository,
      fakeDatabaseRepository,
    );
  });

  it('should be able to generate user login code', async () => {
    fakeUsersRepository.createUser({
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'email@mailtest.com',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    });

    const codeCreated = await generateUserLoginCodeService.execute({
      email: 'email@mailtest.com',
    });

    expect(codeCreated).toHaveProperty('message');
  });

  it('should not be able to generate user login code with a email non-existent', async () => {
    expect(
      generateUserLoginCodeService.execute({
        email: 'email.non.existent@mailtest.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
