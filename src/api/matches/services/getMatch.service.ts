import createHttpError from 'http-errors';

import { IMatchDocument, MatchModel } from '@/db/models/match';
import type { IPlayerDocument } from '@/db/models/player';

export async function getMatchService(id: string) {
  if (!id) {
    throw createHttpError(400, 'ID is required');
  }

  const match = (await MatchModel.findOne({ _id: id, removedAt: null })
    .populate('winnerId')
    .populate('loserId')) as
    | (IMatchDocument & {
        winnerId: IPlayerDocument | null;
        loserId: IPlayerDocument | null;
      })
    | null;

  if (!match) {
    throw createHttpError(404, 'Match not found');
  }

  const { winnerId, loserId, ...rest } = match.toObject();

  return {
    ...rest,
    winner: winnerId,
    loser: loserId,
  };
}
