import type { Response } from 'express';
import { Types } from 'mongoose';
import createHttpError from 'http-errors';

import { FIFTEEN_MINUTES, ONE_DAY } from '@/constants/datetime.js';
import { ISessionDocument, SessionModel } from '@/db/models/session.js';
import { generateToken } from '@/utils/token.js';
import { makeSessionData } from '@/utils/makeData';

export const createSession = async (userId: Types.ObjectId) => {
  const session = await SessionModel.create({
    userId,
    accessToken: generateToken(),
    refreshToken: generateToken(),
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });

  return makeSessionData(session as ISessionDocument);
};

export const refreshSession = async ({
  sessionId,
  refreshToken,
}: {
  sessionId: string;
  refreshToken: string;
}) => {
  const session = await SessionModel.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  await SessionModel.deleteOne({ _id: sessionId, refreshToken });

  return await createSession(session.userId);
};

export const setSessionCookies = (res: Response, session: ISessionDocument) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(session.refreshTokenValidUntil),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(session.refreshTokenValidUntil),
  });
};
