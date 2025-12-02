import createHttpError from 'http-errors';

import { IPlayerDocument, PlayerModel } from '@/db/models/player';

export async function deletePlayerService(id: string) {
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

  if (player.isAdmin) {
    throw createHttpError(403, 'Cannot delete admin player');
  }

  player.removedAt = new Date();
  await player.save();

  return player;
}

