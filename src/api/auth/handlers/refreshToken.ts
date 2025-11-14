import { NextFunction, Response } from 'express';
import { SessionModel } from '../../../db/models/session.js';
import { generateToken } from '../../../utils/token.js';
import { AuthRequest } from '../types.js';

export async function refreshTokenHandler(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const oldToken = req.token;
    const userId = req.user?._id;

    if (!oldToken || !userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const newToken = generateToken();

    await SessionModel.updateOne(
      { token: oldToken, userId, status: 'Active' },
      { token: newToken },
    );

    res.json({
      message: 'Token refreshed successfully',
      token: newToken,
    });
  } catch (err) {
    next(err);
  }
}
