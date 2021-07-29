import IDatabase from '../../app/db/IDatabase';
import AppError from '../../app/errors/AppError';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import ICommentCodesRepository from '../repositories/ICommentCodesRepository';
import FakeCommentCodesRepository from '../repositories/fakes/FakeCommentCodesRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import FakeDatabaseRepository from '../../app/repositories/fakes/FakeDatabaseRepository';
import RemoveCommentCodeService from './RemoveCommentCodeService';

let fakeUsersRepository: IUsersRepository;
let fakeCommentCodesRepository: ICommentCodesRepository;
let fakeDatabaseRepository: IDatabaseRepository;
let removeCommentCodeService: RemoveCommentCodeService;

describe('RemoveCommentCodeService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository({} as IDatabase);
    fakeCommentCodesRepository = new FakeCommentCodesRepository(
      {} as IDatabase,
    );
    fakeDatabaseRepository = new FakeDatabaseRepository({} as IDatabase);

    removeCommentCodeService = new RemoveCommentCodeService(
      fakeUsersRepository,
      fakeCommentCodesRepository,
      fakeDatabaseRepository,
    );
  });

  it('should be able to remove a comment code', async () => {
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

    const commentCodeRemoved = await removeCommentCodeService.execute({
      authorId: userCreated.id,
      commentCodeId: commentCodeCreated.id,
    });

    expect(commentCodeRemoved).toHaveProperty('message');
  });

  it('should not be able to remove a comment code with a non existent user', async () => {
    const commentCodeCreated = await fakeCommentCodesRepository.createCommentCode(
      {
        authorId: 'user-id',
        codeId: 'code-id',
        contentComment: 'test comment code',
      },
    );

    await expect(
      removeCommentCodeService.execute({
        authorId: 'user-non-existent',
        commentCodeId: commentCodeCreated.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a comment code with a non existent comment code', async () => {
    const userCreated = await fakeUsersRepository.createUser({
      username: 'some name',
      description: 'description',
      birthDate: '2021-01-02 00:00:00',
      email: 'email@mailtest.com',
      profilePhoto: 'some profile photo',
      coverPhoto: 'some cover photo',
    });

    await expect(
      removeCommentCodeService.execute({
        authorId: userCreated.id,
        commentCodeId: 'comment-code-non-existent',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to remove a user comment code from another user', async () => {
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
      removeCommentCodeService.execute({
        authorId: user2Created.id,
        commentCodeId: commentCodeCreated.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
