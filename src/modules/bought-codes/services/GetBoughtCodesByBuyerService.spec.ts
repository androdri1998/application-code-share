import IDatabase from '../../app/db/IDatabase';
import IBoughtCodesRepository from '../repositories/IBoughtCodesRepository';
import FakeBoughtCodesRepository from '../repositories/fakes/FakeBoughtCodesRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import FakeDatabaseRepository from '../../app/repositories/fakes/FakeDatabaseRepository';
import GetBoughtCodesByBuyerService from './GetBoughtCodesByBuyerService';

let fakeUsersRepository: IUsersRepository;
let fakeBoughtCodesRepository: IBoughtCodesRepository;
let fakeDatabaseRepository: IDatabaseRepository;
let getBoughtCodesByBuyerService: GetBoughtCodesByBuyerService;

describe('GetBoughtCodesByBuyerService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository({} as IDatabase);
    fakeDatabaseRepository = new FakeDatabaseRepository({} as IDatabase);
    fakeBoughtCodesRepository = new FakeBoughtCodesRepository({} as IDatabase);

    getBoughtCodesByBuyerService = new GetBoughtCodesByBuyerService(
      fakeUsersRepository,
      fakeBoughtCodesRepository,
      fakeDatabaseRepository,
    );
  });

  it('should to be able to list bought codes by buyer', async () => {
    const buyer = {
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    };

    const buyerCreated = await fakeUsersRepository.createUser({
      birthDate: buyer.birthDate,
      coverPhoto: buyer.coverPhoto,
      description: buyer.description,
      email: buyer.email,
      profilePhoto: buyer.profilePhoto,
      username: buyer.username,
    });

    await fakeBoughtCodesRepository.createBoughtCode({
      buyer: buyerCreated.id,
      code: 'code-string1',
      codeId: 'code-id1',
      seller: 'seller-id',
      unavailableAt: null,
    });
    await fakeBoughtCodesRepository.createBoughtCode({
      buyer: buyerCreated.id,
      code: 'code-string2',
      codeId: 'code-id2',
      seller: 'seller-id',
      unavailableAt: null,
    });
    await fakeBoughtCodesRepository.createBoughtCode({
      buyer: buyerCreated.id,
      code: 'code-string3',
      codeId: 'code-id3',
      seller: 'seller-id',
      unavailableAt: null,
    });

    const boughtCodesResponse = await getBoughtCodesByBuyerService.execute({
      buyerId: buyerCreated.id,
      limit: 2,
      page: 0,
    });

    expect(boughtCodesResponse.results.length).toBe(2);
  });

  it('should to be able to list bought codes by buyer with pagination', async () => {
    const buyer = {
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    };

    const buyerCreated = await fakeUsersRepository.createUser({
      birthDate: buyer.birthDate,
      coverPhoto: buyer.coverPhoto,
      description: buyer.description,
      email: buyer.email,
      profilePhoto: buyer.profilePhoto,
      username: buyer.username,
    });

    await fakeBoughtCodesRepository.createBoughtCode({
      buyer: buyerCreated.id,
      code: 'code-string1',
      codeId: 'code-id1',
      seller: 'seller-id',
      unavailableAt: null,
    });
    await fakeBoughtCodesRepository.createBoughtCode({
      buyer: buyerCreated.id,
      code: 'code-string2',
      codeId: 'code-id2',
      seller: 'seller-id',
      unavailableAt: null,
    });
    await fakeBoughtCodesRepository.createBoughtCode({
      buyer: buyerCreated.id,
      code: 'code-string3',
      codeId: 'code-id3',
      seller: 'seller-id',
      unavailableAt: null,
    });

    const boughtCodesResponse = await getBoughtCodesByBuyerService.execute({
      buyerId: buyerCreated.id,
      limit: 2,
      page: 1,
    });

    expect(boughtCodesResponse.results.length).toBe(1);
  });
});
