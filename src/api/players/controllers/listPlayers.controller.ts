import type { NextFunction, Response, Request } from 'express';

import { listPlayersService } from '../services/listPlayers.service.js';
import { makePlayerData } from '@/utils/makeData.js';
import { IPlayerDocument } from '@/db/models/player.js';

export async function listPlayersController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { list, total } = await listPlayersService(req.query);

    res.json({
      data: {
        list: list.map((player) => makePlayerData(player)),
        total,
      },
    });
  } catch (err) {
    next(err);
  }
}
