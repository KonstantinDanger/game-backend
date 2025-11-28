import { type Types } from 'mongoose';
import createHttpError from 'http-errors';

import { PlayerModel } from '@/db/models/player';
import { generateSalt, hashPassword } from '@/utils/password';
import { createSession } from './session.service';

export async function registerService(body: {
  name: string;
  email: string;
  password: string;
}) {
  const { name, email, password } = body;

  if (!name || !email || !password) {
    throw createHttpError(400, 'Name, email and password are required');
  }

  const existingPlayer = await PlayerModel.findOne({ email });

  if (existingPlayer) {
    throw createHttpError(409, 'Player with this email already exists');
  }

  const passwordSalt = generateSalt();
  const passwordHash = await hashPassword(password, passwordSalt);

  const player = await PlayerModel.create({
    name,
    email,
    passwordHash,
    passwordSalt,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const session = await createSession(player._id as Types.ObjectId);

  return { session, player };
}
