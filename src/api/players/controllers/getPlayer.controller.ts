import type { NextFunction, Response, Request } from 'express';
import { getPlayerService } from '../services/getPlayer.service';
import { makePlayerData } from '@/utils/makeData';

export async function getPlayerController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const player = await getPlayerService(req.params.id);

  res.json({
    data: makePlayerData(player),
  });
}
