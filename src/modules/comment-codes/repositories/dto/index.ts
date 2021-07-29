/* eslint-disable camelcase */

export interface CommentCode {
  id: string;
  author_id: string;
  code_id: string;
  content_comment: string;
  created_at: string;
  updated_at: string | null;
}

export interface CreateCommentCodeDTO {
  authorId: string;
  codeId: string;
  contentComment: string;
}

export interface RemoveCommentCodeDTO {
  commentCodeId: string;
}

export interface UpdateCommentCodeDTO {
  commentCodeId: string;
  contentComment: string;
}

export interface FindCommentCodeByIdDTO {
  commentCodeId: string;
}

export interface FindCommentCodesDTO {
  limit: number;
  offset: number;
}

export interface FindCommentCodesByCodeIdDTO {
  codeId: string;
  limit: number;
  offset: number;
}
