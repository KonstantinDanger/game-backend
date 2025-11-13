import { NextFunction, Response } from 'express';
import { PlayerModel } from '../../../db/models/player.js';
import { SessionModel } from '../../../db/models/session.js';
import { generateSalt, hashPassword } from '../../../utils/password.js';
import { generateToken } from '../../../utils/token.js';
import { AuthRequest } from '../types.js';

export async function registerHandler(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required',
      });
    }

    const existingPlayer = await PlayerModel.findOne({ email });
    if (existingPlayer) {
      return res.status(409).json({
        message: 'Player with this email already exists',
      });
    }

    const passwordSalt = generateSalt();
    const passwordHash = await hashPassword(password, passwordSalt);

    const player = new PlayerModel({
      name,
      email,
      passwordHash,
      passwordSalt,
    });

    await player.save();

    const token = generateToken();
    const session = new SessionModel({
      userId: player._id,
      token,
      status: 'Active',
    });

    await session.save();

    res.status(201).json({
      message: 'Player registered successfully',
      token,
      player: {
        id: player._id,
        name: player.name,
        email: player.email,
      },
    });
  } catch (err) {
    next(err);
  }
}
