import { PlayerModel } from '@/db/models/player.js';
import { SessionModel } from '@/db/models/session.js';
import createHttpError from 'http-errors';

export async function getCurrentUserService(
  sessionId: string,
  refreshToken: string,
) {
  try {
    if (!sessionId || !refreshToken) {
      throw createHttpError(401, 'Session ID and refresh token are required');
    }

    const session = await SessionModel.findOne({
      _id: sessionId,
      refreshToken,
    });

    if (!session) {
      throw createHttpError(401, 'Session not found');
    }

    return await PlayerModel.findOne({ _id: session.userId });
  } catch (err) {
    throw err;
  }
}
