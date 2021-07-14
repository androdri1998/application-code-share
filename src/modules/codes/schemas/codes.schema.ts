/* eslint-disable import/prefer-default-export */
import joi from 'joi';

export const createCodeSchema = {
  body: joi.object({
    unavailable_at: joi.string(),
    code: joi.string().required(),
  }),
};

export const getCodesSchema = {
  query: joi.object({
    limit: joi.number().integer(),
    page: joi.number().integer(),
  }),
};

export const getCodesSchemaByUser = {
  params: joi.object({
    userId: joi.string().uuid().required(),
  }),
  query: joi.object({
    limit: joi.number().integer(),
    page: joi.number().integer(),
  }),
};

export const getCodeSchemaByUser = {
  params: joi.object({
    codeId: joi.string().uuid().required(),
  }),
};
