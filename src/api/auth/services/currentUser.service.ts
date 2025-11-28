import { IPlayerDocument, PlayerModel } from '@/db/models/player.js';
import { SessionModel } from '@/db/models/session.js';
import createHttpError from 'http-errors';

export async function getCurrentUserService(
  sessionId: string | undefined,
  refreshToken: string | undefined,
) {
  if (
    !sessionId ||
    !refreshToken ||
    sessionId === 'undefined' ||
    refreshToken === 'undefined'
  ) {
    throw createHttpError(401, 'Session ID and refresh token are required');
  }

  const session = await SessionModel.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const user = (await PlayerModel.findOne({
    _id: session.userId,
  }).select('-passwordHash -passwordSalt')) as IPlayerDocument;

  if (!user) {
    throw createHttpError(401, 'Player not found');
  }

  return { user, session };
}
