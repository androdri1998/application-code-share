import IDatabase from '../../app/db/IDatabase';
import ICodesRepository from '../repositories/ICodesRepository';
import FakeCodesRepository from '../repositories/fakes/FakeCodesRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import FakeDatabaseRepository from '../../app/repositories/fakes/FakeDatabaseRepository';
import GetCodeService from './GetCodeService';
import RemoveCodeService from './RemoveCodeService';
import AppError from '../../app/errors/AppError';

let fakeCodesRepository: ICodesRepository;
let fakeDatabaseRepository: IDatabaseRepository;
let getCodeService: GetCodeService;
let removeCodeService: RemoveCodeService;

describe('RemoveCodeService', () => {
  beforeEach(() => {
    fakeDatabaseRepository = new FakeDatabaseRepository({} as IDatabase);
    fakeCodesRepository = new FakeCodesRepository({} as IDatabase);

    getCodeService = new GetCodeService(
      fakeCodesRepository,
      fakeDatabaseRepository,
    );

    removeCodeService = new RemoveCodeService(
      fakeCodesRepository,
      fakeDatabaseRepository,
    );
  });

  it('should to be able to remove code', async () => {
    const code = {
      user_id: 'user1',
      code: 'teste-code',
      unavailable_at: '2021-07-12',
    };

    const codeCreated = await fakeCodesRepository.createCode({
      userId: code.user_id,
      code: code.code,
      unavailableAt: code.unavailable_at,
    });

    const codeRemoved = await removeCodeService.execute({
      codeId: codeCreated.id,
    });

    expect(codeRemoved).toHaveProperty('message');
    await expect(
      getCodeService.execute({
        codeId: codeCreated.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not to be able to remove code a code-non-existent', async () => {
    await expect(
      removeCodeService.execute({
        codeId: 'code-non-existent',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
