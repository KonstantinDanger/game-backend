import type { NextFunction, Response, Request } from 'express';
import {
  refreshSession,
  setSessionCookies,
} from '../services/session.service.js';

export async function refreshSessionController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const oldToken = req.cookies.refreshToken;
    const sessionId = req.cookies.sessionId;

    const session = await refreshSession({ sessionId, refreshToken: oldToken });
    setSessionCookies(res, session);

    res.json({
      message: 'Token refreshed successfully',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (err) {
    next(err);
  }
}
