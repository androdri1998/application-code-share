/* eslint-disable import/prefer-default-export */
import joi from 'joi';

export const userLoginCodeGenerateSchema = {
  body: joi.object({
    email: joi.string().email().required(),
  }),
};

export const checkUserLoginCodeSchema = {
  body: joi.object({
    code: joi.string().uuid().required(),
  }),
};
