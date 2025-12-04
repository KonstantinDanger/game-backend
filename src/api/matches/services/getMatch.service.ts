import createHttpError from 'http-errors';

import { IMatchDocument, MatchModel } from '@/db/models/match';
import type { IPlayerDocument } from '@/db/models/player';
import { makePlayerData } from '@/utils/makeData';

export async function getMatchService(id: string) {
  const match = (await MatchModel.findOne({ _id: id, removedAt: null })
    .populate('winnerId', '_id name')
    .populate('loserId', '_id name')) as
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
    winner: winnerId && makePlayerData(winnerId),
    loser: loserId && makePlayerData(loserId),
  };
}
