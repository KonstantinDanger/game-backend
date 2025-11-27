import createHttpError from 'http-errors';

import { IPlayerDocument, PlayerModel } from '@/db/models/player.js';

export async function getPlayerService(id: string) {
  try {
    if (!id) {
      throw createHttpError(400, 'ID is required');
    }

    const player = (await PlayerModel.findById(id)) as IPlayerDocument;

    if (!player) {
      throw createHttpError(404, 'Player not found');
    }

    return player;
  } catch (err) {
    throw err;
  }
}
