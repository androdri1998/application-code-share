/* eslint-disable import/prefer-default-export */
import joi from 'joi';

export const UserLoginCodeGenerateSchema = {
  body: joi.object({
    email: joi.string().email().required(),
  }),
};
