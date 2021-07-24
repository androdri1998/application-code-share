import IDatabase from '../../app/db/IDatabase';
import IBoughtCodesRepository from '../repositories/IBoughtCodesRepository';
import FakeBoughtCodesRepository from '../repositories/fakes/FakeBoughtCodesRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import FakeDatabaseRepository from '../../app/repositories/fakes/FakeDatabaseRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import RemoveBoughtCodeService from './RemoveBoughtCodeService';
import AppError from '../../app/errors/AppError';

let fakeUsersRepository: IUsersRepository;
let fakeBoughtCodesRepository: IBoughtCodesRepository;
let fakeDatabaseRepository: IDatabaseRepository;
let removeBoughtCodeService: RemoveBoughtCodeService;

describe('RemoveBoughtCodeService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository({} as IDatabase);
    fakeDatabaseRepository = new FakeDatabaseRepository({} as IDatabase);
    fakeBoughtCodesRepository = new FakeBoughtCodesRepository({} as IDatabase);

    removeBoughtCodeService = new RemoveBoughtCodeService(
      fakeUsersRepository,
      fakeBoughtCodesRepository,
      fakeDatabaseRepository,
    );
  });

  it('should to be able to remove bought code', async () => {
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

    const boughtCode = await fakeBoughtCodesRepository.createBoughtCode({
      buyer: buyerCreated.id,
      code: 'code-string',
      codeId: 'code-id',
      seller: 'seller-id',
      unavailableAt: null,
    });

    const boughtCodeRemove = await removeBoughtCodeService.execute({
      boughtCodeId: boughtCode.id,
      userId: buyerCreated.id,
    });

    expect(boughtCodeRemove).toHaveProperty('message');
  });

  it('should not to be able to remove bought code from a bought code non existent', async () => {
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

    await expect(
      removeBoughtCodeService.execute({
        boughtCodeId: 'bought-code-non-existent',
        userId: buyerCreated.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not to be able to remove bought code from a buyer non existent', async () => {
    await fakeBoughtCodesRepository.createBoughtCode({
      buyer: 'buyer-id',
      code: 'code-string',
      codeId: 'code-id',
      seller: 'seller-id',
      unavailableAt: null,
    });

    await expect(
      removeBoughtCodeService.execute({
        boughtCodeId: 'bought-code-non-existent',
        userId: 'buyer-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
