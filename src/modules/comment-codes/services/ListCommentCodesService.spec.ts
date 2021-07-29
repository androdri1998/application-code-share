import IDatabase from '../../app/db/IDatabase';
import AppError from '../../app/errors/AppError';
import ICommentCodesRepository from '../repositories/ICommentCodesRepository';
import FakeCommentCodesRepository from '../repositories/fakes/FakeCommentCodesRepository';
import ICodesRepository from '../../codes/repositories/ICodesRepository';
import FakeCodesRepository from '../../codes/repositories/fakes/FakeCodesRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import FakeDatabaseRepository from '../../app/repositories/fakes/FakeDatabaseRepository';
import ListCommentCodesService from './ListCommentCodesService';

let fakeCommentCodesRepository: ICommentCodesRepository;
let fakeDatabaseRepository: IDatabaseRepository;
let fakeCodesRepository: ICodesRepository;
let listCommentCodesService: ListCommentCodesService;

describe('ListCommentCodesService', () => {
  beforeEach(() => {
    fakeCommentCodesRepository = new FakeCommentCodesRepository(
      {} as IDatabase,
    );
    fakeDatabaseRepository = new FakeDatabaseRepository({} as IDatabase);
    fakeCodesRepository = new FakeCodesRepository({} as IDatabase);

    listCommentCodesService = new ListCommentCodesService(
      fakeCommentCodesRepository,
      fakeCodesRepository,
      fakeDatabaseRepository,
    );
  });

  it('should be able to list comment codes', async () => {
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

    await fakeCommentCodesRepository.createCommentCode({
      authorId: 'user-id',
      codeId: codeCreated.id,
      contentComment: 'test comment code',
    });

    await fakeCommentCodesRepository.createCommentCode({
      authorId: 'user-id',
      codeId: codeCreated.id,
      contentComment: 'test comment code',
    });

    await fakeCommentCodesRepository.createCommentCode({
      authorId: 'user-id',
      codeId: codeCreated.id,
      contentComment: 'test comment code',
    });

    await fakeCommentCodesRepository.createCommentCode({
      authorId: 'user-id',
      codeId: codeCreated.id,
      contentComment: 'test comment code',
    });

    const commentCodes = await listCommentCodesService.execute({
      codeId: codeCreated.id,
    });

    expect(commentCodes.results.length).toBe(4);
  });

  it('should be able to list comment codes with pagination', async () => {
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

    await fakeCommentCodesRepository.createCommentCode({
      authorId: 'user-id',
      codeId: codeCreated.id,
      contentComment: 'test comment code',
    });

    await fakeCommentCodesRepository.createCommentCode({
      authorId: 'user-id',
      codeId: codeCreated.id,
      contentComment: 'test comment code',
    });

    await fakeCommentCodesRepository.createCommentCode({
      authorId: 'user-id',
      codeId: codeCreated.id,
      contentComment: 'test comment code',
    });

    const commentCodes = await listCommentCodesService.execute({
      codeId: codeCreated.id,
      limit: 2,
      page: 1,
    });

    expect(commentCodes.results.length).toBe(1);
  });

  it('should not be able to list comment codes with a non existent code', async () => {
    await expect(
      listCommentCodesService.execute({
        codeId: 'code-non-existent',
        limit: 1,
        page: 0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
