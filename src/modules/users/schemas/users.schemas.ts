/* eslint-disable import/prefer-default-export */
import joi from 'joi';

export const registerUserSchema = {
  body: joi.object({
    username: joi.string().required(),
    description: joi.string(),
    birthDate: joi.string().required(),
    email: joi.string().email().required(),
    profilePhoto: joi.string(),
    coverPhoto: joi.string(),
  }),
};
