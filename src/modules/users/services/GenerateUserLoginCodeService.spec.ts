import IDatabase from '../../app/db/IDatabase';
import AppError from '../../app/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserLoginCodeRepository from '../repositories/fakes/FakeUserLoginCodeRepository';
import GenerateUserLoginCodeService from './GenerateUserLoginCodeService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserLoginCodeRepository: FakeUserLoginCodeRepository;
let generateUserLoginCodeService: GenerateUserLoginCodeService;

describe('RegisterUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository({} as IDatabase);
    fakeUserLoginCodeRepository = new FakeUserLoginCodeRepository(
      {} as IDatabase,
    );
    generateUserLoginCodeService = new GenerateUserLoginCodeService(
      fakeUsersRepository,
      fakeUserLoginCodeRepository,
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
