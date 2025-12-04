import type { NextFunction, Response, Request } from 'express';

import { listPlayersService } from '../services/listPlayers.service';
import { makePlayerData } from '@/utils/makeData';

export async function listPlayersController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { list, totalCount } = await listPlayersService(req.query);
  const isAdmin = req.body?.user?.isAdmin === true;
  res.json({
    data: {
      list: list.map((player) => makePlayerData(player, false, isAdmin)),
      totalCount,
    },
  });
}
