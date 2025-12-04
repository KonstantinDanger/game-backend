import type { NextFunction, Response, Request } from 'express';

import { deletePlayerService } from '../services/deletePlayer.service';
import createHttpError from 'http-errors';

export async function deletePlayerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.user?.isAdmin) {
    return next(createHttpError(403, 'Only admins can delete players'));
  }

  await deletePlayerService(req.params.id);

  res.json({
    message: 'Player deleted successfully',
  });
}
