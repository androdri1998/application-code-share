/* eslint-disable import/prefer-default-export */
import joi from 'joi';

export const createBoughtCodeSchema = {
  params: joi.object({
    codeId: joi.string().uuid().required(),
  }),
};

export const getBoughtCodeSchema = {
  params: joi.object({
    boughtCodeId: joi.string().uuid().required(),
  }),
};

export const removeBoughtCodeSchema = {
  params: joi.object({
    boughtCodeId: joi.string().uuid().required(),
  }),
};
