import type { NextFunction, Response, Request } from 'express';
import { getCurrentUserService } from '../services/currentUser.service';
import { makePlayerData } from '@/utils/makeData';

export async function currentUserController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { user, session } = await getCurrentUserService(
    req.cookies.sessionId,
    req.cookies.refreshToken,
  );

  res.json({ data: makePlayerData(user), accessToken: session.accessToken });
}
