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

export const getCodesByUserSchema = {
  params: joi.object({
    userId: joi.string().uuid().required(),
  }),
  query: joi.object({
    limit: joi.number().integer(),
    page: joi.number().integer(),
  }),
};

export const getCodeSchema = {
  params: joi.object({
    codeId: joi.string().uuid().required(),
  }),
};

export const removeCodeSchema = {
  params: joi.object({
    codeId: joi.string().uuid().required(),
  }),
};

export const updateCodeSchema = {
  params: joi.object({
    codeId: joi.string().uuid().required(),
  }),
  body: joi.object({
    code: joi.string().required(),
  }),
};

export const updateValidateCodeSchema = {
  params: joi.object({
    codeId: joi.string().uuid().required(),
  }),
  body: joi.object({
    is_valid: joi.boolean().required(),
  }),
};

export const updateUnavailableAtCodeSchema = {
  params: joi.object({
    codeId: joi.string().uuid().required(),
  }),
  body: joi.object({
    unavailable_at: joi.string().allow(null).required(),
  }),
};
