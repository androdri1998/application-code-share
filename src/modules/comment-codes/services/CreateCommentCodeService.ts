/* eslint-disable camelcase */
import HTTPStatusCode from 'http-status-codes';

import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import AppError from '../../app/errors/AppError';
import messages from '../../app/intl/messages/en-US';
import ICommentCodesRepository from '../repositories/ICommentCodesRepository';
import ICodesRepository from '../../codes/repositories/ICodesRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import { CommentCode } from '../repositories/dto';

interface ExecuteDTO {
  authorId: string;
  codeId: string;
  contentComment: string;
}

interface ExecuteResponse {
  comment_code: CommentCode;
}

class CreateCommentCodeService {
  private usersRepository: IUsersRepository;

  private commentCodesRepository: ICommentCodesRepository;

  private codesRepository: ICodesRepository;

  private databaseRepository: IDatabaseRepository;

  constructor(
    usersRepository: IUsersRepository,
    commentCodesRepository: ICommentCodesRepository,
    codesRepository: ICodesRepository,
    databaseRepository: IDatabaseRepository,
  ) {
    this.usersRepository = usersRepository;
    this.commentCodesRepository = commentCodesRepository;
    this.codesRepository = codesRepository;
    this.databaseRepository = databaseRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({
    authorId,
    codeId,
    contentComment,
  }: ExecuteDTO): Promise<ExecuteResponse> {
    try {
      await this.databaseRepository.beginTransaction();

      const user = await this.usersRepository.findUserById({
        userId: authorId,
      });
      if (!user) {
        throw new AppError(
          messages.errors.USER_NOT_FOUND,
          HTTPStatusCode.NOT_FOUND,
        );
      }

      const code = await this.codesRepository.findCodeById({
        codeId,
      });
      if (!code) {
        throw new AppError(
          messages.errors.CODE_NOT_FOUND,
          HTTPStatusCode.NOT_FOUND,
        );
      }

      const commentCodeCreated = await this.commentCodesRepository.createCommentCode(
        {
          authorId,
          codeId,
          contentComment,
        },
      );

      await this.databaseRepository.commit();

      return { comment_code: commentCodeCreated };
    } catch (error) {
      await this.databaseRepository.rollback();
      throw error;
    }
  }
}

export default CreateCommentCodeService;
