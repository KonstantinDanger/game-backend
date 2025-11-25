import type { Types } from 'mongoose';
import createHttpError from 'http-errors';

import { IPlayerDocument, PlayerModel } from '@/db/models/player.js';
import { verifyPassword } from '@/utils/password.js';
import { createSession } from './session.service.js';

export async function loginService(body: { email: string; password: string }) {
  try {
    const { email, password } = body;

    if (!email || !password) {
      throw createHttpError(400, 'Email and password are required');
    }

    const player = (await PlayerModel.findOne({ email })) as IPlayerDocument;

    if (!player) {
      throw createHttpError(401, 'User not found');
    }

    const isValidPassword = await verifyPassword(
      password,
      player.passwordHash,
      player.passwordSalt,
    );

    if (!isValidPassword) {
      throw createHttpError(401, 'Invalid email or password');
    }

    const session = await createSession(player._id as Types.ObjectId);

    return { session, player };
  } catch (err) {
    throw err;
  }
}
