import type { NextFunction, Response, Request } from 'express';
import { logoutService } from '../services/logout.service';

export async function logoutController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const sessionId = req.cookies.sessionId;

  if (sessionId) {
    await logoutService(sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).json({
    message: 'Logout successful',
  });
}
