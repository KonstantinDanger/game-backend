import createHttpError from 'http-errors';

import { IPlayerDocument, PlayerModel } from '@/db/models/player';
import { IMatchDocument, MatchModel } from '@/db/models/match';
import { makeMatchData, makePlayerData } from '@/utils/makeData';

export async function getPlayerService(id: string, isAdmin?: boolean) {
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

  return {
    player: makePlayerData(player, false, isAdmin),
    matches: matches.map((match) =>
      makeMatchData(match as unknown as IMatchDocument),
    ),
  };
}
