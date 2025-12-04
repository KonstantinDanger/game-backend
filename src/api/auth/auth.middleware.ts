import type { NextFunction, Response, Request } from 'express';
import createHttpError from 'http-errors';

import { SessionModel } from '@/db/models/session';
import { PlayerModel } from '@/db/models/player';

export async function authorize(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(createHttpError(401, 'Please provide Authorization header'));
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Auth header should be of type Bearer'));
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

  req.user = user;
  next();
}

export async function initUser(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return next();
    }

    const session = await SessionModel.findOne({
      accessToken: token,
    });

    if (!session) {
      return next();
    }

    const isAccessTokenExpired =
      new Date() > new Date(session.accessTokenValidUntil);

    if (isAccessTokenExpired) {
      return next();
    }

    const user = await PlayerModel.findById(session.userId);

    if (!user) {
      return next();
    }

    req.user = user;

    next();
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    } else {
      console.error('Authentication error occurred');
    }
    next();
  }
}
