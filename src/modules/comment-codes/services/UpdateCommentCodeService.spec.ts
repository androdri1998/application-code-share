import IDatabase from '../../app/db/IDatabase';
import AppError from '../../app/errors/AppError';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import ICommentCodesRepository from '../repositories/ICommentCodesRepository';
import FakeCommentCodesRepository from '../repositories/fakes/FakeCommentCodesRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import FakeDatabaseRepository from '../../app/repositories/fakes/FakeDatabaseRepository';
import UpdateCommentCodeService from './UpdateCommentCodeService';

let fakeUsersRepository: IUsersRepository;
let fakeCommentCodesRepository: ICommentCodesRepository;
let fakeDatabaseRepository: IDatabaseRepository;
let updateCommentCodeService: UpdateCommentCodeService;

describe('UpdateCommentCodeService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository({} as IDatabase);
    fakeCommentCodesRepository = new FakeCommentCodesRepository(
      {} as IDatabase,
    );
    fakeDatabaseRepository = new FakeDatabaseRepository({} as IDatabase);

    updateCommentCodeService = new UpdateCommentCodeService(
      fakeUsersRepository,
      fakeCommentCodesRepository,
      fakeDatabaseRepository,
    );
  });

  it('should be able to update a comment code', async () => {
    const userCreated = await fakeUsersRepository.createUser({
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'email@mailtest.com',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    });

    const commentCodeCreated = await fakeCommentCodesRepository.createCommentCode(
      {
        authorId: userCreated.id,
        codeId: 'code-id',
        contentComment: 'test comment code',
      },
    );

    const commentCodeUpdated = await updateCommentCodeService.execute({
      authorId: userCreated.id,
      commentCodeId: commentCodeCreated.id,
      contentComment: 'test comment code update',
    });

    expect(commentCodeUpdated.comment_code.content_comment).toBe(
      'test comment code update',
    );
  });

  it('should not be able to update a comment code with a non existent user', async () => {
    const commentCodeCreated = await fakeCommentCodesRepository.createCommentCode(
      {
        authorId: 'user-id',
        codeId: 'code-id',
        contentComment: 'test comment code',
      },
    );

    await expect(
      updateCommentCodeService.execute({
        authorId: 'user-non-existent',
        commentCodeId: commentCodeCreated.id,
        contentComment: 'test comment code update',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a comment code with a non existent comment code', async () => {
    const userCreated = await fakeUsersRepository.createUser({
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'email@mailtest.com',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    });

    await expect(
      updateCommentCodeService.execute({
        authorId: userCreated.id,
        commentCodeId: 'comment-code-non-existent',
        contentComment: 'test comment code update',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a user comment code from another user', async () => {
    const userCreated = await fakeUsersRepository.createUser({
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'email@mailtest.com',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    });

    const user2Created = await fakeUsersRepository.createUser({
      username: 'some name 2',
      description: 'description 2',
      birthDate: '2021-01-02 00:00:00',
      email: 'email2@mailtest.com',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    });

    const commentCodeCreated = await fakeCommentCodesRepository.createCommentCode(
      {
        authorId: userCreated.id,
        codeId: 'code-id',
        contentComment: 'test comment code',
      },
    );

    await expect(
      updateCommentCodeService.execute({
        authorId: user2Created.id,
        commentCodeId: commentCodeCreated.id,
        contentComment: 'test comment code update',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
