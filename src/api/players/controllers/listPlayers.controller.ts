import { NextFunction, Response } from 'express';
import { PlayerModel } from '@/db/models/player.js';
import { AuthRequest } from '@/api/auth/types.js';

export async function listPlayersController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    // Parse pagination from query params
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [players, total] = await Promise.all([
      PlayerModel.find()
        .select('-passwordHash -passwordSalt')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      PlayerModel.countDocuments(),
    ]);

    const playersData = players.map((player) => ({
      id: player._id.toString(),
      name: player.name,
      email: player.email,
    }));

    res.json(playersData);
  } catch (err) {
    next(err);
  }
}
