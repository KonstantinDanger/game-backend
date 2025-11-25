import type { NextFunction, Response, Request } from 'express';
import { getPlayerService } from '../services/getPlayer.service.js';

export async function getPlayerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const player = await getPlayerService(req.params.id);

    res.json({
      data: player,
    });
  } catch (err) {
    next(err);
  }
}
