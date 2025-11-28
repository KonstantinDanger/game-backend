import type { NextFunction, Response, Request } from 'express';

import { listPlayersService } from '../services/listPlayers.service.js';
import { makePlayerData } from '@/utils/makeData.js';

export async function listPlayersController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { list, totalPages } = await listPlayersService(req.query);

    res.json({
      data: {
        list: list.map((player) => makePlayerData(player)),
        totalPages,
      },
    });
  } catch (err) {
    next(err);
  }
}
