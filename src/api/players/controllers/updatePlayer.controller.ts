import type { NextFunction, Response, Request } from 'express';

import { updatePlayerService } from '../services/updatePlayer.service';
import { makePlayerData } from '@/utils/makeData';

export async function updatePlayerController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const player = await updatePlayerService(req.body, req.params.id);
  const isAdmin = req.body?.user?.isAdmin === true;

  res.json({
    data: makePlayerData(player, false, isAdmin),
  });
}
