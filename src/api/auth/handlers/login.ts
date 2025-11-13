import { NextFunction, Response } from 'express';
import { PlayerModel } from '../../../db/models/player.js';
import { SessionModel } from '../../../db/models/session.js';
import { verifyPassword } from '../../../utils/password.js';
import { generateToken } from '../../../utils/token.js';
import { AuthRequest } from '../types.js';

export async function loginHandler(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }

    const player = await PlayerModel.findOne({ email });
    if (!player) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const isValidPassword = await verifyPassword(
      password,
      player.passwordHash,
      player.passwordSalt,
    );

    if (!isValidPassword) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const token = generateToken();
    const session = new SessionModel({
      userId: player._id,
      token,
      status: 'Active',
    });

    await session.save();

    res.json({
      message: 'Login successful',
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
