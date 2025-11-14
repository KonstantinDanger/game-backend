import { NextFunction, Response } from 'express';
import { SessionModel } from '../../../db/models/session.js';
import { AuthRequest } from '../types.js';

export async function logoutHandler(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.token;

    await SessionModel.updateOne({ token }, { status: 'Inactive' });

    res.json({
      message: 'Logout successful',
    });
  } catch (err) {
    next(err);
  }
}
