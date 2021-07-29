/* eslint-disable import/prefer-default-export */
import joi from 'joi';

export const createCommentCodeSchema = {
  params: joi.object({
    codeId: joi.string().uuid().required(),
  }),
  body: joi.object({
    contentComment: joi.string().required(),
  }),
};
