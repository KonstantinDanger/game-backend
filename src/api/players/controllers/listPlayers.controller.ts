import type { NextFunction, Response, Request } from 'express';

import { listPlayersService } from '../services/listPlayers.service';
import { makePlayerData } from '@/utils/makeData';

export async function listPlayersController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { list, totalCount } = await listPlayersService(
    req.query as unknown as { page: number; perPage: number },
  );
  const isAdmin = req.user?.isAdmin === true;
  res.json({
    data: {
      list: list.map((player) => makePlayerData(player, false, isAdmin)),
      totalCount,
    },
  });
}
