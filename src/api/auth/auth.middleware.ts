import { NextFunction, Response } from 'express';
import { SessionModel } from '../../db/models/session.js';
import { AuthRequest } from './types.js';

export async function authorize(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader =
      (req as any).headers?.authorization ||
      (req as any).headers?.Authorization ||
      '';
    const token = authHeader.replace('Bearer ', '');

    if (!token) {
      throw new Error('Auth token not provided');
    }

    const session = await SessionModel.findSessionByToken(token);
    if (!session) {
      throw new Error('Auth token is not valid');
    }

    req.user = session.user;
    req.token = session.token;
    next();
  } catch (err) {
    next(err);
  }
}
