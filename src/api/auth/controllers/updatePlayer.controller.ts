import type { NextFunction, Response, Request } from 'express';

import { updatePlayerService } from '../services/updatePlayer.service.js';
import { makePlayerData } from '@/utils/makeData.js';

export async function updatePlayerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const player = await updatePlayerService(
      req.body,
      req.params.id || req.body.user._id.toString(),
    );

    res.json({
      message: 'Player updated successfully',
      data: makePlayerData(player),
    });
  } catch (err) {
    next(err);
  }
}
