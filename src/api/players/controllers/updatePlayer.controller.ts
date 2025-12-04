import type { NextFunction, Response, Request } from 'express';
import createHttpError from 'http-errors';

import { updatePlayerService } from '../services/updatePlayer.service';
import { makePlayerData } from '@/utils/makeData';

export async function updatePlayerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.user) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  const currentUserId = String(req.user._id);
  const targetUserId = req.params.id;
  const isAdmin = req.user.isAdmin;

  if (currentUserId !== targetUserId && !isAdmin) {
    return next(createHttpError(403, 'You can only update your own profile'));
  }

  const player = await updatePlayerService(req.body, req.params.id);

  res.json({
    data: makePlayerData(player, false, isAdmin),
  });
}
