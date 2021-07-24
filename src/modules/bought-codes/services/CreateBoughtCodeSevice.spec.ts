import IDatabase from '../../app/db/IDatabase';
import IBoughtCodesRepository from '../repositories/IBoughtCodesRepository';
import ICodesRepository from '../../codes/repositories/ICodesRepository';
import FakeCodesRepository from '../../codes/repositories/fakes/FakeCodesRepository';
import FakeBoughtCodesRepository from '../repositories/fakes/FakeBoughtCodesRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import FakeDatabaseRepository from '../../app/repositories/fakes/FakeDatabaseRepository';
import CreateBoughtCodeSevice from './CreateBoughtCodeSevice';
import AppError from '../../app/errors/AppError';

let fakeUsersRepository: IUsersRepository;
let fakeBoughtCodesRepository: IBoughtCodesRepository;
let fakeDatabaseRepository: IDatabaseRepository;
let fakeCodesRepository: ICodesRepository;
let createBoughtCodeSevice: CreateBoughtCodeSevice;

describe('CreateBoughtCodeSevice', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository({} as IDatabase);
    fakeDatabaseRepository = new FakeDatabaseRepository({} as IDatabase);
    fakeBoughtCodesRepository = new FakeBoughtCodesRepository({} as IDatabase);
    fakeCodesRepository = new FakeCodesRepository({} as IDatabase);

    createBoughtCodeSevice = new CreateBoughtCodeSevice(
      fakeUsersRepository,
      fakeBoughtCodesRepository,
      fakeCodesRepository,
      fakeDatabaseRepository,
    );
  });

  it('should to be able to bought code', async () => {
    const buyer = {
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    };

    const seller = {
      username: 'some name 1',
      description: 'description 1',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email 1',
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

    const sellerCreated = await fakeUsersRepository.createUser({
      birthDate: seller.birthDate,
      coverPhoto: seller.coverPhoto,
      description: seller.description,
      email: seller.email,
      profilePhoto: seller.profilePhoto,
      username: seller.username,
    });

    const code = {
      user_id: sellerCreated.id,
      code: 'teste-code',
      unavailable_at: '2021-07-12',
    };

    const codeCreated = await fakeCodesRepository.createCode({
      userId: code.user_id,
      code: code.code,
      unavailableAt: code.unavailable_at,
    });

    const boughtCode = await createBoughtCodeSevice.execute({
      codeId: codeCreated.id,
      buyer: buyerCreated.id,
    });

    expect(boughtCode.bought_code).toHaveProperty('id');
  });

  it('should not to be able to bought code when seller and buyer are the same', async () => {
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

    const code = {
      user_id: buyerCreated.id,
      code: 'teste-code',
      unavailable_at: '2021-07-12',
    };

    const codeCreated = await fakeCodesRepository.createCode({
      userId: code.user_id,
      code: code.code,
      unavailableAt: code.unavailable_at,
    });

    await expect(
      createBoughtCodeSevice.execute({
        codeId: codeCreated.id,
        buyer: buyerCreated.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not to be able to bought code without a valid code', async () => {
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
      createBoughtCodeSevice.execute({
        codeId: 'code-non-existent',
        buyer: buyerCreated.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not to be able to bought code without a buyer valid', async () => {
    const seller = {
      username: 'some name 1',
      description: 'description 1',
      birthDate: '2021-01-02 00:00:00',
      email: 'some email 1',
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

    const code = {
      user_id: sellerCreated.id,
      code: 'teste-code',
      unavailable_at: '2021-07-12',
    };

    const codeCreated = await fakeCodesRepository.createCode({
      userId: code.user_id,
      code: code.code,
      unavailableAt: code.unavailable_at,
    });

    await expect(
      createBoughtCodeSevice.execute({
        codeId: codeCreated.id,
        buyer: 'buyer-non-existent',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not to be able to bought code without a seller valid', async () => {
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

    const code = {
      user_id: 'seller-non-existent',
      code: 'teste-code',
      unavailable_at: '2021-07-12',
    };

    const codeCreated = await fakeCodesRepository.createCode({
      userId: code.user_id,
      code: code.code,
      unavailableAt: code.unavailable_at,
    });

    await expect(
      createBoughtCodeSevice.execute({
        codeId: codeCreated.id,
        buyer: buyerCreated.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
