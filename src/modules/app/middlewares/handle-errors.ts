/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import HTTPStatusCode from 'http-status-codes';

import AppError from '../errors/AppError';
import messages from '../intl/messages/en-US';
import DebugLogProvider from '../providers/implementations/DebugLogProvider';

const handleErrors = (
  err: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void | Response<any, Record<string, any>> => {
  const debugLogProvider = new DebugLogProvider();
  debugLogProvider.errorLog({ params: err, message: err.message });

  if (err.statusCode && err.statusCode < HTTPStatusCode.INTERNAL_SERVER_ERROR) {
    return res.status(err.statusCode).json({
      error: err.error,
      error_description: err.message,
    });
  }

  return res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({
    error: messages.errors.INTERNAL_ERROR_SERVER,
    error_description: messages.errors.INTERNAL_ERROR_SERVER_MESSAGE,
  });
};

export default handleErrors;
