import type { NextFunction, Response, Request } from 'express';

import { deletePlayerService } from '../services/deletePlayer.service';

export async function deletePlayerController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  await deletePlayerService(req.params.id);

  res.json({
    message: 'Player deleted successfully',
  });
}

