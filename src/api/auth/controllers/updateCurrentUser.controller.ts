import type { NextFunction, Response, Request } from 'express';

import { updatePlayerService } from '../services/updatePlayer.service';
import { makePlayerData } from '@/utils/makeData';

export async function updateCurrentUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.user) {
    return next();
  }

  const userId = String(req.user._id);
  const player = await updatePlayerService(req.body, userId);

  return res.json({
    message: 'Player updated successfully',
    data: makePlayerData(player, true, true),
  });
}
