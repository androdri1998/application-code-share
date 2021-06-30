/* eslint-disable import/prefer-default-export */
import joi from 'joi';

export const registerUserSchema = {
  body: joi.object({
    username: joi.string().required(),
    description: joi.string(),
    birthDate: joi.string().required(),
    email: joi.string().email().required(),
  }),
};

export const getUsersSchema = {
  query: joi.object({
    username: joi.string().default(''),
    limit: joi.number().default(10),
    page: joi.number().default(0),
  }),
};

export const getUserSchema = {
  params: joi.object({
    userId: joi.string().uuid().required(),
  }),
};

export const deleteUserSchema = {
  params: joi.object({
    userId: joi.string().uuid().required(),
  }),
};
