import { NextFunction, Response } from 'express';
import { PlayerModel } from '../../../db/models/player.js';
import { generateSalt, hashPassword } from '../../../utils/password.js';
import { AuthRequest } from '../types.js';

export async function updatePlayerHandler(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = req.user;
    const { name, email, password } = req.body;

    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const player = await PlayerModel.findById(user._id);
    if (!player) {
      return res.status(404).json({
        message: 'Player not found',
      });
    }

    if (name !== undefined) {
      player.name = name;
    }

    if (email !== undefined) {
      const existingPlayer = await PlayerModel.findOne({
        email,
        _id: { $ne: user._id },
      });
      if (existingPlayer) {
        return res.status(409).json({
          message: 'Email is already taken',
        });
      }
      player.email = email;
    }

    if (password !== undefined) {
      const passwordSalt = generateSalt();
      const passwordHash = await hashPassword(password, passwordSalt);
      player.passwordHash = passwordHash;
      player.passwordSalt = passwordSalt;
    }

    await player.save();

    res.json({
      message: 'Player updated successfully',
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
