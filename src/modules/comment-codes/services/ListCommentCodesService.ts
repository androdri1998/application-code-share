import HTTPStatusCode from 'http-status-codes';

import AppError from '../../app/errors/AppError';
import messages from '../../app/intl/messages/en-US';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import ICommentCodesRepository from '../repositories/ICommentCodesRepository';
import ICodesRepository from '../../codes/repositories/ICodesRepository';
import { CommentCode } from '../repositories/dto';

interface ExecuteDTO {
  codeId: string;
  limit?: number;
  page?: number;
}

interface ExecuteResponse {
  results: CommentCode[];
}

class ListCommentCodesService {
  private codesRepository: ICodesRepository;

  private commentCodesRepository: ICommentCodesRepository;

  private databaseRepository: IDatabaseRepository;

  constructor(
    commentCodesRepository: ICommentCodesRepository,
    codesRepository: ICodesRepository,
    databaseRepository: IDatabaseRepository,
  ) {
    this.codesRepository = codesRepository;
    this.commentCodesRepository = commentCodesRepository;
    this.databaseRepository = databaseRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({
    limit = 10,
    page = 0,
    codeId,
  }: ExecuteDTO): Promise<ExecuteResponse> {
    try {
      await this.databaseRepository.beginTransaction();

      const code = await this.codesRepository.findCodeById({
        codeId,
      });
      if (!code) {
        throw new AppError(
          messages.errors.CODE_NOT_FOUND,
          HTTPStatusCode.NOT_FOUND,
        );
      }

      const offset = limit * page;
      const commentCodes = await this.commentCodesRepository.findCommentCodesByCodeId(
        {
          codeId,
          limit,
          offset,
        },
      );

      await this.databaseRepository.commit();

      return { results: commentCodes };
    } catch (error) {
      await this.databaseRepository.rollback();
      throw error;
    }
  }
}

export default ListCommentCodesService;
