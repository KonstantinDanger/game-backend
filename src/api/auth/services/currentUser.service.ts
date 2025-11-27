import { IPlayerDocument, PlayerModel } from '@/db/models/player.js';
import { SessionModel } from '@/db/models/session.js';
import createHttpError from 'http-errors';

export async function getCurrentUserService(
  sessionId: string | undefined,
  refreshToken: string | undefined,
) {
  try {
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

    const player = (await PlayerModel.findOne({
      _id: session.userId,
    }).select('-passwordHash -passwordSalt')) as IPlayerDocument;

    if (!player) {
      throw createHttpError(401, 'Player not found');
    }

    return player;
  } catch (err) {
    throw err;
  }
}
