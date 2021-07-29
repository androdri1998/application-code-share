import IDatabase from '../../app/db/IDatabase';
import AppError from '../../app/errors/AppError';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import ICommentCodesRepository from '../repositories/ICommentCodesRepository';
import FakeCommentCodesRepository from '../repositories/fakes/FakeCommentCodesRepository';
import ICodesRepository from '../../codes/repositories/ICodesRepository';
import FakeCodesRepository from '../../codes/repositories/fakes/FakeCodesRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import FakeDatabaseRepository from '../../app/repositories/fakes/FakeDatabaseRepository';
import CreateCommentCodeService from './CreateCommentCodeService';

let fakeUsersRepository: IUsersRepository;
let fakeCodesRepository: ICodesRepository;
let fakeCommentCodesRepository: ICommentCodesRepository;
let fakeDatabaseRepository: IDatabaseRepository;
let createCommentCodeService: CreateCommentCodeService;

describe('CreateCommentCodeService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository({} as IDatabase);
    fakeCodesRepository = new FakeCodesRepository({} as IDatabase);
    fakeCommentCodesRepository = new FakeCommentCodesRepository(
      {} as IDatabase,
    );
    fakeDatabaseRepository = new FakeDatabaseRepository({} as IDatabase);

    createCommentCodeService = new CreateCommentCodeService(
      fakeUsersRepository,
      fakeCommentCodesRepository,
      fakeCodesRepository,
      fakeDatabaseRepository,
    );
  });

  it('should be able to create a comment code', async () => {
    const userCreated = await fakeUsersRepository.createUser({
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'email@mailtest.com',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    });

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

    const commentCodeCreated = await createCommentCodeService.execute({
      authorId: userCreated.id,
      codeId: codeCreated.id,
      contentComment: 'test comment code',
    });

    expect(commentCodeCreated.comment_code).toHaveProperty('id');
  });

  it('should not be able to create a comment code with a non existent user', async () => {
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

    await expect(
      createCommentCodeService.execute({
        authorId: 'user-non-existent',
        codeId: codeCreated.id,
        contentComment: 'test comment code',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a comment code with a non existent code', async () => {
    const userCreated = await fakeUsersRepository.createUser({
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'email@mailtest.com',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    });

    await expect(
      createCommentCodeService.execute({
        authorId: userCreated.id,
        codeId: 'code-non-existent',
        contentComment: 'test comment code',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
