import type { NextFunction, Response, Request } from 'express';

import { listPlayersService } from '../services/listPlayers.service';
import { makePlayerData } from '@/utils/makeData';

export async function listPlayersController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { list, totalPages } = await listPlayersService(req.query);

  res.json({
    data: {
      list: list.map((player) => makePlayerData(player)),
      totalPages,
    },
  });
}
