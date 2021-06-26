import 'dotenv/config';
import IDatabase from '../../app/db/IDatabase';
import AppError from '../../app/errors/AppError';
import IUserLoginCodeRepository from '../repositories/IUserLoginCodeRepository';
import FakeUserLoginCodeRepository from '../repositories/fakes/FakeUserLoginCodeRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import FakeDatabaseRepository from '../../app/repositories/fakes/FakeDatabaseRepository';
import CheckUserLoginCodeService from './CheckUserLoginCodeService';

let fakeUserLoginCodeRepository: IUserLoginCodeRepository;
let fakeDatabaseRepository: IDatabaseRepository;
let checkUserLoginCodeService: CheckUserLoginCodeService;

describe('CheckUserLoginCodeController', () => {
  beforeEach(() => {
    fakeUserLoginCodeRepository = new FakeUserLoginCodeRepository(
      {} as IDatabase,
    );
    fakeDatabaseRepository = new FakeDatabaseRepository({} as IDatabase);

    checkUserLoginCodeService = new CheckUserLoginCodeService(
      fakeUserLoginCodeRepository,
      fakeDatabaseRepository,
    );
  });

  it('should be able to check user login code', async () => {
    const userLoginCode = await fakeUserLoginCodeRepository.create({
      user_id: '6AA66C97-B7AB-4053-8FC5-6459D20F22E7',
    });

    const codeCreated = await checkUserLoginCodeService.execute({
      code: userLoginCode.code,
    });

    expect(codeCreated).toHaveProperty('token');
  });

  it('should not be able to check user login code with a code non-existent', async () => {
    await expect(
      checkUserLoginCodeService.execute({
        code: 'code-non-existent',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to check user login code with a invalid code', async () => {
    const userLoginCode = await fakeUserLoginCodeRepository.create({
      user_id: '6AA66C97-B7AB-4053-8FC5-6459D20F22E7',
    });

    await fakeUserLoginCodeRepository.invalidateUserLoginCodeByCode({
      code: userLoginCode.code,
      is_valid: false,
    });

    await expect(
      checkUserLoginCodeService.execute({
        code: userLoginCode.code,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
