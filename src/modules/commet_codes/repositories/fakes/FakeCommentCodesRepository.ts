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

class FakeCommentCodesRepository implements ICommentCodesRepository {
  private database: IDatabase;

  private commentCodes: CommentCode[];

  constructor(database: IDatabase) {
    this.database = database;

    this.commentCodes = [];
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

    this.commentCodes.push(commentCodeValues);

    return commentCodeValues;
  }

  async removeCommentCode({
    commentCodeId,
  }: RemoveCommentCodeDTO): Promise<boolean> {
    const newCommentCodes = this.commentCodes.filter(
      commentCode => commentCode.id !== commentCodeId,
    );
    this.commentCodes = newCommentCodes;

    const isDeleted = true;
    return isDeleted;
  }

  async updateCommentCode({
    commentCodeId,
    contentComment,
  }: UpdateCommentCodeDTO): Promise<CommentCode | null> {
    const updatedAt = generateCurrentDate();

    const commentCodeToUpdateIndex = this.commentCodes.findIndex(
      commentCodeToFind => commentCodeToFind.id === commentCodeId,
    );

    const commentCodeToUpdateObject = this.commentCodes[
      commentCodeToUpdateIndex
    ];
    this.commentCodes[commentCodeToUpdateIndex] = {
      ...commentCodeToUpdateObject,
      content_comment: contentComment,
      updated_at: updatedAt,
    };

    const commentCodeUpdated = this.findCommentCodeById({ commentCodeId });

    return commentCodeUpdated;
  }

  async findCommentCodeById({
    commentCodeId,
  }: FindCommentCodeByIdDTO): Promise<CommentCode> {
    const commentCodeFound = this.commentCodes.find(
      commentCode => commentCode.id === commentCodeId,
    );
    return commentCodeFound || null;
  }

  async findCommentCodes({
    limit,
    offset,
  }: FindCommentCodesDTO): Promise<CommentCode[]> {
    const newLimit = offset + limit;
    return this.commentCodes.slice(offset, newLimit);
  }

  async findCommentCodesByCodeId({
    codeId,
    limit,
    offset,
  }: FindCommentCodesByCodeIdDTO): Promise<CommentCode[]> {
    const commentCodes = this.commentCodes.filter(
      commentCode => commentCode.code_id === codeId,
    );
    const newLimit = offset + limit;
    return commentCodes.slice(offset, newLimit);
  }
}

export default FakeCommentCodesRepository;
