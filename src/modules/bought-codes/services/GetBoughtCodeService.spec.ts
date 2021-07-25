import IDatabase from '../../app/db/IDatabase';
import IBoughtCodesRepository from '../repositories/IBoughtCodesRepository';
import FakeBoughtCodesRepository from '../repositories/fakes/FakeBoughtCodesRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import FakeDatabaseRepository from '../../app/repositories/fakes/FakeDatabaseRepository';
import GetBoughtCodeService from './GetBoughtCodeService';
import AppError from '../../app/errors/AppError';

let fakeBoughtCodesRepository: IBoughtCodesRepository;
let fakeDatabaseRepository: IDatabaseRepository;
let getBoughtCodeService: GetBoughtCodeService;

describe('GetBoughtCodeService', () => {
  beforeEach(() => {
    fakeDatabaseRepository = new FakeDatabaseRepository({} as IDatabase);
    fakeBoughtCodesRepository = new FakeBoughtCodesRepository({} as IDatabase);

    getBoughtCodeService = new GetBoughtCodeService(
      fakeBoughtCodesRepository,
      fakeDatabaseRepository,
    );
  });

  it('should to be able to list bought code', async () => {
    const boughtCode = await fakeBoughtCodesRepository.createBoughtCode({
      buyer: 'buyer-id',
      code: 'code-string',
      codeId: 'code-id',
      seller: 'seller-id',
      unavailableAt: null,
    });

    const boughtCodeResponse = await getBoughtCodeService.execute({
      boughtCodeId: boughtCode.id,
    });

    expect(boughtCodeResponse.bought_code).toHaveProperty('id');
  });

  it('should not to be able to list bought code non existent', async () => {
    await expect(
      getBoughtCodeService.execute({
        boughtCodeId: 'bought-code-non-existent',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
