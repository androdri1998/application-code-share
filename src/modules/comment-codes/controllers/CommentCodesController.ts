/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import HTTPStatusCode from 'http-status-codes';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import ICodesRepository from '../../codes/repositories/ICodesRepository';
import ICommentCodesRepository from '../repositories/ICommentCodesRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';

import CreateCommentCodeService from '../services/CreateCommentCodeService';
import RemoveCommentCodeService from '../services/RemoveCommentCodeService';
import UpdateCommentCodeService from '../services/UpdateCommentCodeService';
import ListCommentCodesService from '../services/ListCommentCodesService';

class CommentCodesController {
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

    this.store = this.store.bind(this);
    this.destroy = this.destroy.bind(this);
    this.update = this.update.bind(this);
    this.index = this.index.bind(this);
  }

  async store(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const { codeId } = req.params;
    const { contentComment } = req.body;
    const userId = req.user?.id;

    const createCommentCodeService = new CreateCommentCodeService(
      this.usersRepository,
      this.commentCodesRepository,
      this.codesRepository,
      this.databaseRepository,
    );

    const response = await createCommentCodeService.execute({
      codeId,
      authorId: userId,
      contentComment,
    });

    return res.status(HTTPStatusCode.CREATED).json(response);
  }

  async destroy(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const { commentCodeId } = req.params;
    const userId = req.user?.id;

    const removeCommentCodeService = new RemoveCommentCodeService(
      this.usersRepository,
      this.commentCodesRepository,
      this.databaseRepository,
    );

    const response = await removeCommentCodeService.execute({
      commentCodeId,
      authorId: userId,
    });

    return res.status(HTTPStatusCode.NO_CONTENT).json(response);
  }

  async update(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const { commentCodeId } = req.params;
    const { contentComment } = req.body;
    const userId = req.user?.id;

    const updateCommentCodeService = new UpdateCommentCodeService(
      this.usersRepository,
      this.commentCodesRepository,
      this.databaseRepository,
    );

    const response = await updateCommentCodeService.execute({
      commentCodeId,
      authorId: userId,
      contentComment,
    });

    return res.status(HTTPStatusCode.OK).json(response);
  }

  async index(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const { codeId } = req.params;
    const { limit, page } = req.query;

    const listCommentCodesService = new ListCommentCodesService(
      this.commentCodesRepository,
      this.codesRepository,
      this.databaseRepository,
    );

    const response = await listCommentCodesService.execute({
      codeId,
      limit: limit ? parseInt(limit as string) : 10,
      page: page ? parseInt(page as string) : 0,
    });

    return res.status(HTTPStatusCode.OK).json(response);
  }
}

export default CommentCodesController;
