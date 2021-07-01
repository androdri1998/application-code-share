import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../../../config/app';
import AppError from '../../app/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthentication(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [pattern, token] = authHeader.split(' ');

  if (pattern !== 'Bearer') {
    throw new AppError('Token malformatted', 401);
  }

  try {
    const decoded = verify(token, authConfig.jwt.secret as string);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { exp, iat, sub } = decoded as ITokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}
