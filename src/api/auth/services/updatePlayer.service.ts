import createHttpError from 'http-errors';
import { IPlayerDocument, PlayerModel } from '@/db/models/player.js';
import { generateSalt, hashPassword } from '@/utils/password.js';

export async function updatePlayerService(
  body: {
    name?: string;
    email?: string;
    password?: string;
  },
  id: string,
) {
  try {
    const { name, email, password } = body;

    if (!id || !name || !email) {
      throw createHttpError(400, 'ID, name and email are required');
    }

    const player = (await PlayerModel.findById(id).select(
      '-passwordHash -passwordSalt',
    )) as IPlayerDocument;

    if (!player) {
      throw createHttpError(404, 'Player not found');
    }

    if (name !== undefined) {
      player.name = name;
    }

    if (email !== undefined) {
      player.email = email;
    }

    if (password !== undefined) {
      const passwordSalt = generateSalt();
      const passwordHash = await hashPassword(password, passwordSalt);
      player.passwordHash = passwordHash;
      player.passwordSalt = passwordSalt;
    }

    await player.save();

    return player;
  } catch (err) {
    throw err;
  }
}
