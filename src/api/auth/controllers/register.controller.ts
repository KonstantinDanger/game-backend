import type { NextFunction, Response, Request } from 'express';

import { setSessionCookies } from '../services/session.service';
import { registerService } from '../services/register.service';
import { makePlayerData } from '@/utils/makeData';

export async function registerController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { session, player } = await registerService(req.body);

  setSessionCookies(res, session);

  res.status(201).json({
    message: 'Player registered successfully',
    data: {
      accessToken: session.accessToken,
      player: makePlayerData(player, true),
    },
  });
}
