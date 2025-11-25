import createHttpError from 'http-errors';

import { PlayerModel } from '@/db/models/player.js';
import { makePlayerData } from '@/utils/makeData.js';

export async function getPlayerService(id: string) {
  try {
    if (!id) {
      throw createHttpError(400, 'ID is required');
    }

    const player = await PlayerModel.findById(id).select(
      '-passwordHash -passwordSalt',
    );

    if (!player) {
      throw createHttpError(404, 'Player not found');
    }

    return makePlayerData(player);
  } catch (err) {
    throw err;
  }
}
