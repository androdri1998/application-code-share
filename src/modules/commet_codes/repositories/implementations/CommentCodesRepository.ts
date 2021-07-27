/* eslint-disable camelcase */
import { v4 as uuidv4 } from 'uuid';

import IDatabase from '../../../app/db/IDatabase';
import { generateCurrentDate } from '../../../app/utils/date';
import ICommentCodesRepository from '../ICommentCodesRepository';
import {
  CommentCode,
  CreateCommentCodeDTO,
  FindCommentCodesByCodeIdDTO,
  FindCommentCodesDTO,
  FindCommentCodeByIdDTO,
  RemoveCommentCodeDTO,
  UpdateCommentCodeDTO,
} from '../dto';

class CommentCodesRepository implements ICommentCodesRepository {
  private database: IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }

  async createCommentCode({
    authorId,
    codeId,
    contentComment,
  }: CreateCommentCodeDTO): Promise<CommentCode> {
    const createdAt = generateCurrentDate();
    const updatedAt = null;

    const commentCodeValues = {
      id: uuidv4(),
      author_id: authorId,
      code_id: codeId,
      content_comment: contentComment,
      created_at: createdAt,
      updated_at: updatedAt,
    };

    const values = [
      commentCodeValues.id,
      commentCodeValues.author_id,
      commentCodeValues.code_id,
      commentCodeValues.content_comment,
      commentCodeValues.created_at,
      commentCodeValues.updated_at,
    ];

    await this.database.query(
      `insert into
      comment_codes(id, author_id, code_id, content_comment, created_at, updated_at)
    values ($1, $2, $3, $4, $5, $6);`,
      values,
    );

    return commentCodeValues;
  }

  async removeCommentCode({
    commentCodeId,
  }: RemoveCommentCodeDTO): Promise<boolean> {
    const values = [commentCodeId];
    await this.database.query(`delete from comment_codes where id=$1;`, values);

    const isDeleted = true;
    return isDeleted;
  }

  async updateCommentCode({
    commentCodeId,
    contentComment,
  }: UpdateCommentCodeDTO): Promise<CommentCode | null> {
    const updatedAt = generateCurrentDate();

    const values = [contentComment, updatedAt, commentCodeId];

    await this.database.query(
      `update comment_codes
        set content_comment=$1, updated_at=$2
        where id=$3`,
      values,
    );

    const commentCodeUpdated = this.findCommentCodeById({ commentCodeId });

    return commentCodeUpdated;
  }

  async findCommentCodeById({
    commentCodeId,
  }: FindCommentCodeByIdDTO): Promise<CommentCode> {
    const values = [commentCodeId];
    const response = await this.database.query(
      `select * from comment_codes where id=$1;`,
      values,
    );

    const commentCode = response.results[0];
    return commentCode || null;
  }

  async findCommentCodes({
    limit,
    offset,
  }: FindCommentCodesDTO): Promise<CommentCode[]> {
    const values = [limit, offset];
    const response = await this.database.query(
      `select *
        from comment_codes
        limit $1 offset $2;`,
      values,
    );

    const commentCodes = response.results;
    return commentCodes;
  }

  async findCommentCodesByCodeId({
    codeId,
    limit,
    offset,
  }: FindCommentCodesByCodeIdDTO): Promise<CommentCode[]> {
    const values = [codeId, limit, offset];
    const response = await this.database.query(
      `select *
        from comment_codes
        where code_id=$1
        limit $2 offset $3;`,
      values,
    );

    const commentCodes = response.results;
    return commentCodes;
  }
}

export default CommentCodesRepository;
