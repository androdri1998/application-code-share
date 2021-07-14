import IDatabase from '../../app/db/IDatabase';
import ICodesRepository from '../repositories/ICodesRepository';
import FakeCodesRepository from '../repositories/fakes/FakeCodesRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import FakeDatabaseRepository from '../../app/repositories/fakes/FakeDatabaseRepository';
import GetCodeService from './GetCodeService';
import AppError from '../../app/errors/AppError';

let fakeCodesRepository: ICodesRepository;
let fakeDatabaseRepository: IDatabaseRepository;
let getCodeService: GetCodeService;

describe('GetCodeService', () => {
  beforeEach(() => {
    fakeDatabaseRepository = new FakeDatabaseRepository({} as IDatabase);
    fakeCodesRepository = new FakeCodesRepository({} as IDatabase);

    getCodeService = new GetCodeService(
      fakeCodesRepository,
      fakeDatabaseRepository,
    );
  });

  it('should to be able to list code', async () => {
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

    const codeFound = await getCodeService.execute({
      codeId: codeCreated.id,
    });

    expect(codeFound.code.id).toBe(codeCreated.id);
  });

  it('should not to be able to list code a code-non-existent', async () => {
    await expect(
      getCodeService.execute({
        codeId: 'code-non-existent',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
