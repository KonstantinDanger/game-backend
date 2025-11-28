import type { NextFunction, Response, Request } from 'express';
import createHttpError from 'http-errors';

import { SessionModel } from '@/db/models/session.js';
import { PlayerModel } from '@/db/models/player';

export async function authorize(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(createHttpError(401, 'Please provide Authorization header'));
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      next(createHttpError(401, 'Auth header should be of type Bearer'));
      return;
    }

    const session = await SessionModel.findOne({ accessToken: token });

    if (!session) {
      return next(createHttpError(401, 'Session not found'));
    }

    const isAccessTokenExpired =
      new Date() > new Date(session.accessTokenValidUntil);

    if (isAccessTokenExpired) {
      await SessionModel.deleteOne({ accessToken: token });
      return next(createHttpError(401, 'Access token expired'));
    }

    const user = await PlayerModel.findById(session.userId);

    if (!user) {
      return next(createHttpError(401, 'Unauthorized'));
    }

    if (!req.body) req.body = {};
    req.body.user = user;
    next();
  } catch (err) {
    next(err);
  }
}
