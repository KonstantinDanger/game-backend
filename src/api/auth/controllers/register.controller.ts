import type { NextFunction, Response, Request } from 'express';

import { setSessionCookies } from '../services/session.service.js';
import { registerService } from '../services/register.service.js';
import { makePlayerData } from '@/utils/makeData.js';

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { session, player } = await registerService(req.body);

    setSessionCookies(res, session);

    res.status(201).json({
      message: 'Player registered successfully',
      data: {
        accessToken: session.accessToken,
        player: makePlayerData(player),
      },
    });
  } catch (err) {
    next(err);
  }
}
