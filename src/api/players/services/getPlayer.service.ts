import createHttpError from 'http-errors';

import { IPlayerDocument, PlayerModel } from '@/db/models/player';

export async function getPlayerService(id: string) {
  if (!id) {
    throw createHttpError(400, 'ID is required');
  }

  const player = (await PlayerModel.findById(id)) as IPlayerDocument;

  if (!player) {
    throw createHttpError(404, 'Player not found');
  }

  return player;
}
