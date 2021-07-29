import {
  CreateCommentCodeDTO,
  CommentCode,
  RemoveCommentCodeDTO,
  UpdateCommentCodeDTO,
  FindCommentCodeByIdDTO,
  FindCommentCodesDTO,
  FindCommentCodesByCodeIdDTO,
} from './dto';

export default interface ICodesRepository {
  createCommentCode({
    authorId,
    codeId,
    contentComment,
  }: CreateCommentCodeDTO): Promise<CommentCode>;
  removeCommentCode({ commentCodeId }: RemoveCommentCodeDTO): Promise<boolean>;
  updateCommentCode({
    commentCodeId,
    contentComment,
  }: UpdateCommentCodeDTO): Promise<CommentCode | null>;
  findCommentCodeById({
    commentCodeId,
  }: FindCommentCodeByIdDTO): Promise<CommentCode | null>;
  findCommentCodes({
    limit,
    offset,
  }: FindCommentCodesDTO): Promise<CommentCode[]>;
  findCommentCodesByCodeId({
    codeId,
    limit,
    offset,
  }: FindCommentCodesByCodeIdDTO): Promise<CommentCode[]>;
}
