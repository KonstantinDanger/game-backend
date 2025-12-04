import type { NextFunction, Response, Request } from 'express';
import { logoutService } from '../services/logout.service';

export async function logoutController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const sessionId = req.headers['x-session-id'] as string;

  if (sessionId) {
    await logoutService(sessionId);
  }

  res.status(204).json({
    message: 'Logout successful',
  });
}
