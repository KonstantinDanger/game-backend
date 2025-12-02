import type { NextFunction, Request, Response } from 'express';

import { loginService } from '../services/login.service';
import { setSessionCookies } from '../services/session.service';
import { makePlayerData } from '@/utils/makeData';

export const loginUserController = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { session, player } = await loginService(req.body);

  setSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in!',
    data: {
      accessToken: session.accessToken,
      player: makePlayerData(player, true),
    },
  });
};
