import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing.');
  }

  const [, token] = authHeader.split(' ');

  try {
    verify(token, authConfig.jwt.secret);
    return next();
  } catch {
    throw new AppError('Invalid JWT token.');
  }
}
