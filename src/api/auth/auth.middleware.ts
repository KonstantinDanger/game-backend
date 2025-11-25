import type { NextFunction, Response, Request } from 'express';
import createHttpError from 'http-errors';

import { SessionModel } from '@/db/models/session.js';

export async function authorize(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const sessionId = req.cookies.sessionId;
    const refreshToken = req.cookies.refreshToken;

    const session = await SessionModel.findOne({
      _id: sessionId,
      refreshToken,
    });

    if (!session) {
      throw createHttpError(401, 'Unauthorized');
    }

    next();
  } catch (err) {
    next(err);
  }
}
