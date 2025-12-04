import type { NextFunction, Response, Request } from 'express';
import { refreshSession } from '../services/session.service';

export async function refreshSessionController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const refreshToken = req.headers['x-refresh-token'] as string;
  const sessionId = req.headers['x-session-id'] as string;

  const session = await refreshSession({ sessionId, refreshToken });

  res.json({
    message: 'Token refreshed successfully',
    data: {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      sessionId: session.id,
    },
  });
}
