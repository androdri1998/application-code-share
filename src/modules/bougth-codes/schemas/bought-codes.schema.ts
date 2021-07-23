/* eslint-disable import/prefer-default-export */
import joi from 'joi';

export const createBoughtCodeSchema = {
  params: joi.object({
    codeId: joi.string().uuid().required(),
  }),
};
