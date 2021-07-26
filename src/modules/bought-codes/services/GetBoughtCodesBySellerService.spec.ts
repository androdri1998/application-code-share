import IDatabase from '../../app/db/IDatabase';
import IBoughtCodesRepository from '../repositories/IBoughtCodesRepository';
import FakeBoughtCodesRepository from '../repositories/fakes/FakeBoughtCodesRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import FakeDatabaseRepository from '../../app/repositories/fakes/FakeDatabaseRepository';
import GetBoughtCodesBySellerService from './GetBoughtCodesBySellerService';

let fakeUsersRepository: IUsersRepository;
let fakeBoughtCodesRepository: IBoughtCodesRepository;
let fakeDatabaseRepository: IDatabaseRepository;
let getBoughtCodesBySellerService: GetBoughtCodesBySellerService;

describe('GetBoughtCodesBySellerService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository({} as IDatabase);
    fakeDatabaseRepository = new FakeDatabaseRepository({} as IDatabase);
    fakeBoughtCodesRepository = new FakeBoughtCodesRepository({} as IDatabase);

    getBoughtCodesBySellerService = new GetBoughtCodesBySellerService(
      fakeUsersRepository,
      fakeBoughtCodesRepository,
      fakeDatabaseRepository,
    );
  });

  it('should to be able to list bought codes by seller', async () => {
    const seller = {
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    };

    const sellerCreated = await fakeUsersRepository.createUser({
      birthDate: seller.birthDate,
      coverPhoto: seller.coverPhoto,
      description: seller.description,
      email: seller.email,
      profilePhoto: seller.profilePhoto,
      username: seller.username,
    });

    await fakeBoughtCodesRepository.createBoughtCode({
      buyer: 'buyer-id',
      code: 'code-string1',
      codeId: 'code-id1',
      seller: sellerCreated.id,
      unavailableAt: null,
    });
    await fakeBoughtCodesRepository.createBoughtCode({
      buyer: 'buyer-id',
      code: 'code-string2',
      codeId: 'code-id2',
      seller: sellerCreated.id,
      unavailableAt: null,
    });
    await fakeBoughtCodesRepository.createBoughtCode({
      buyer: 'buyer-id',
      code: 'code-string3',
      codeId: 'code-id3',
      seller: sellerCreated.id,
      unavailableAt: null,
    });

    const boughtCodesResponse = await getBoughtCodesBySellerService.execute({
      sellerId: sellerCreated.id,
      limit: 2,
      page: 0,
    });

    expect(boughtCodesResponse.results.length).toBe(2);
  });

  it('should to be able to list bought codes by seller with pagination', async () => {
    const seller = {
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    };

    const sellerCreated = await fakeUsersRepository.createUser({
      birthDate: seller.birthDate,
      coverPhoto: seller.coverPhoto,
      description: seller.description,
      email: seller.email,
      profilePhoto: seller.profilePhoto,
      username: seller.username,
    });

    await fakeBoughtCodesRepository.createBoughtCode({
      buyer: 'buyer-id',
      code: 'code-string1',
      codeId: 'code-id1',
      seller: sellerCreated.id,
      unavailableAt: null,
    });
    await fakeBoughtCodesRepository.createBoughtCode({
      buyer: 'buyer-id',
      code: 'code-string2',
      codeId: 'code-id2',
      seller: sellerCreated.id,
      unavailableAt: null,
    });
    await fakeBoughtCodesRepository.createBoughtCode({
      buyer: 'buyer-id',
      code: 'code-string3',
      codeId: 'code-id3',
      seller: sellerCreated.id,
      unavailableAt: null,
    });

    const boughtCodesResponse = await getBoughtCodesBySellerService.execute({
      sellerId: sellerCreated.id,
      limit: 2,
      page: 1,
    });

    expect(boughtCodesResponse.results.length).toBe(1);
  });
});
