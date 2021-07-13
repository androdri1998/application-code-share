/* eslint-disable import/prefer-default-export */
import joi from 'joi';

export const createCodeSchema = {
  body: joi.object({
    unavailable_at: joi.string(),
    code: joi.string().required(),
  }),
};
