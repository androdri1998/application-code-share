/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import HTTPStatusCode from 'http-status-codes';

import AppError from '../errors/AppError';
import messages from '../intl/messages/en-US';

interface KeyString {
  [key: string]: any;
}

enum ScopesEnum {
  BODY = 'body',
  QUERY = 'query',
  PARAMS = 'params',
}

const validateParams = (schemas: KeyString = {}) => async (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): Promise<void | Response<any, Record<string, any>>> => {
  await Promise.all(
    Object.keys(schemas).map(async scope => {
      try {
        if (scope === ScopesEnum.BODY) {
          await schemas[scope].validateAsync(req.body);
        } else if (scope === ScopesEnum.QUERY) {
          await schemas[scope].validateAsync(req.query);
        } else if (scope === ScopesEnum.PARAMS) {
          await schemas[scope].validateAsync(req.params);
        } else {
          throw new Error(messages.errors.SCOPE_NOT_FOUND);
        }
      } catch (error) {
        throw new AppError(error.message, HTTPStatusCode.BAD_REQUEST);
      }
    }),
  );

  return next();
};

export default validateParams;
