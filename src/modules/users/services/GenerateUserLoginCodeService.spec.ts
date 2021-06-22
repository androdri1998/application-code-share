import IDatabase from '../../app/db/IDatabase';
import AppError from '../../app/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import GenerateUserLoginCodeService from './GenerateUserLoginCodeService';

let fakeUsersRepository: FakeUsersRepository;
let generateUserLoginCodeService: GenerateUserLoginCodeService;

describe('RegisterUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository({} as IDatabase);
    generateUserLoginCodeService = new GenerateUserLoginCodeService();
  });

  it('should be able to generate user login code', async () => {
    const codeCreated = await generateUserLoginCodeService.execute();

    expect(codeCreated).toHaveProperty('message');
  });
});
