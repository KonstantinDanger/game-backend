import type { NextFunction, Response, Request } from 'express';
import { getCurrentUserService } from '../services/currentUser.service';
import { makePlayerData } from '@/utils/makeData';

export async function getCurrentUserController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const sessionId = req.headers['x-session-id'] as string;
  const refreshToken = req.headers['x-refresh-token'] as string;

  const { user, session } = await getCurrentUserService(
    sessionId,
    refreshToken,
  );

  res.json({
    data: makePlayerData(user, true, true),
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
    sessionId: session.id,
  });
}
