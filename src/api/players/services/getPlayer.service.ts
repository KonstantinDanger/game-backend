import createHttpError from 'http-errors';

import { IPlayerDocument, PlayerModel } from '@/db/models/player';
import { MatchModel } from '@/db/models/match';

export async function getPlayerService(id: string) {
  if (!id) {
    throw createHttpError(400, 'ID is required');
  }

  const player = (await PlayerModel.findOne({
    _id: id,
    removedAt: null,
  })) as IPlayerDocument;

  if (!player) {
    throw createHttpError(404, 'Player not found');
  }

  const matches = await MatchModel.find({
    $or: [{ winnerId: id }, { loserId: id }],
    removedAt: null,
  })
    .sort({ matchDate: -1 })
    .lean();

  player.playedMatchesCount = matches.length;

  return { player, matches };
}
