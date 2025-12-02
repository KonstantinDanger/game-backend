import type { NextFunction, Response, Request } from 'express';
import createHttpError from 'http-errors';

import { ISessionDocument, SessionModel } from '@/db/models/session';
import { IPlayerDocument, PlayerModel } from '@/db/models/player';

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

  if (!req.body) req.body = {};
  req.body.user = user;
  next();
}

export async function initUser(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;
    const [bearer, token] = authHeader?.split(' ') || [];

    const session = (await SessionModel.findOne({
      accessToken: token,
    })) as ISessionDocument;

    const user = (await PlayerModel.findById(
      session.userId,
    )) as IPlayerDocument;

    if (!req.body) req.body = {};

    req.body.user = user;

    next();
  } catch (error) {
    next();
  }
}
