import type { NextFunction, Response, Request } from 'express';

import { registerService } from '../services/register.service';
import { makePlayerData } from '@/utils/makeData';

export async function registerController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { session, player } = await registerService(req.body);

  res.status(201).json({
    message: 'Player registered successfully',
    data: {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      sessionId: session.id,
      player: makePlayerData(player, true),
    },
  });
}
