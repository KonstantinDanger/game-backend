import type { NextFunction, Response, Request } from 'express';
import { logoutService } from '../services/logout.service.js';

export async function logoutController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const sessionId = req.cookies.sessionId;

    if (sessionId) {
      await logoutService(sessionId);
    }

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    res.status(204).json({
      message: 'Logout successful',
    });
  } catch (err) {
    next(err);
  }
}
