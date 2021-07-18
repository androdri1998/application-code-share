import IDatabase from '../../app/db/IDatabase';
import ICodesRepository from '../repositories/ICodesRepository';
import FakeCodesRepository from '../repositories/fakes/FakeCodesRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import FakeDatabaseRepository from '../../app/repositories/fakes/FakeDatabaseRepository';
import GetCodeService from './GetCodeService';
import UpdateCodeService from './UpdateCodeService';
import AppError from '../../app/errors/AppError';

let fakeCodesRepository: ICodesRepository;
let fakeDatabaseRepository: IDatabaseRepository;
let getCodeService: GetCodeService;
let updateCodeService: UpdateCodeService;

describe('UpdateCodeService', () => {
  beforeEach(() => {
    fakeDatabaseRepository = new FakeDatabaseRepository({} as IDatabase);
    fakeCodesRepository = new FakeCodesRepository({} as IDatabase);

    getCodeService = new GetCodeService(
      fakeCodesRepository,
      fakeDatabaseRepository,
    );
    updateCodeService = new UpdateCodeService(
      fakeCodesRepository,
      fakeDatabaseRepository,
    );
  });

  it('should to be able to update code', async () => {
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

    await updateCodeService.execute({
      codeId: codeCreated.id,
      code: 'code-updated',
    });

    const codeFound = await getCodeService.execute({
      codeId: codeCreated.id,
    });

    expect(codeFound.code.code).toBe('code-updated');
  });

  it('should not to be able to update code a code-non-existent', async () => {
    await expect(
      updateCodeService.execute({
        codeId: 'code-non-existent',
        code: 'code',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
