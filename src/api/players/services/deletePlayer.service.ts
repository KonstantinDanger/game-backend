import createHttpError from 'http-errors';

import { IPlayerDocument, PlayerModel } from '@/db/models/player';

export async function deletePlayerService(id: string) {
  if (!id) {
    throw createHttpError(400, 'ID is required');
  }

  const player = (await PlayerModel.findOneAndUpdate(
    {
      _id: id,
      removedAt: null,
      isAdmin: false,
    },
    {
      removedAt: new Date(),
    },
  )) as IPlayerDocument;

  return player;
}
