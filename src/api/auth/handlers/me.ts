import { NextFunction, Response } from 'express';
import { AuthRequest } from '../types.js';

export async function meHandler(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = req.user;

    res.json({
      player: {
        id: user?._id,
        name: user?.name,
        email: user?.email,
      },
    });
  } catch (err) {
    next(err);
  }
}
