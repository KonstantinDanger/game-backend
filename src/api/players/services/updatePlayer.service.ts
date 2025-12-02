import createHttpError from 'http-errors';
import { IPlayerDocument, PlayerModel } from '@/db/models/player';

export async function updatePlayerService(
  body: {
    name?: string;
    email?: string;
  },
  id: string,
) {
  const { name, email } = body;

  const player = (await PlayerModel.findById(id)) as IPlayerDocument;

  if (!player) {
    throw createHttpError(404, 'Player not found');
  }

  if (name !== undefined) {
    player.name = name;
  }

  if (email !== undefined) {
    player.email = email;
  }

  await player.save();

  return player;
}

