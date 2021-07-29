/* eslint-disable camelcase */
import HTTPStatusCode from 'http-status-codes';

import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import AppError from '../../app/errors/AppError';
import messages from '../../app/intl/messages/en-US';
import ICommentCodesRepository from '../repositories/ICommentCodesRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import { CommentCode } from '../repositories/dto';

interface ExecuteDTO {
  authorId: string;
  commentCodeId: string;
  contentComment: string;
}

interface ExecuteResponse {
  comment_code: CommentCode;
}

class UpdateCommentCodeService {
  private usersRepository: IUsersRepository;

  private commentCodesRepository: ICommentCodesRepository;

  private databaseRepository: IDatabaseRepository;

  constructor(
    usersRepository: IUsersRepository,
    commentCodesRepository: ICommentCodesRepository,
    databaseRepository: IDatabaseRepository,
  ) {
    this.usersRepository = usersRepository;
    this.commentCodesRepository = commentCodesRepository;
    this.databaseRepository = databaseRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({
    authorId,
    commentCodeId,
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

      const commentCode = await this.commentCodesRepository.findCommentCodeById(
        {
          commentCodeId,
        },
      );
      if (!commentCode) {
        throw new AppError(
          messages.errors.COMMENT_CODE_NOT_FOUND,
          HTTPStatusCode.NOT_FOUND,
        );
      }

      if (user.id !== commentCode.author_id) {
        throw new AppError(
          messages.errors.USER_CANNOT_DO_THIS_ACTION,
          HTTPStatusCode.CONFLICT,
        );
      }

      const commentCodeUpdated = await this.commentCodesRepository.updateCommentCode(
        {
          commentCodeId,
          contentComment,
        },
      );

      if (!commentCodeUpdated) {
        throw new AppError(
          messages.errors.COMMENT_CODE_NOT_FOUND,
          HTTPStatusCode.NOT_FOUND,
        );
      }

      await this.databaseRepository.commit();

      return { comment_code: commentCodeUpdated };
    } catch (error) {
      await this.databaseRepository.rollback();
      throw error;
    }
  }
}

export default UpdateCommentCodeService;
