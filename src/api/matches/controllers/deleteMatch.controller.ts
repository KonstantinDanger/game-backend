import type { NextFunction, Response, Request } from 'express';

import { deleteMatchService } from '../services/deleteMatch.service';
import createHttpError from 'http-errors';

export async function deleteMatchController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.body?.user?.isAdmin) {
    return next(createHttpError(403, 'Only admins can delete matches'));
  }

  await deleteMatchService(req.params.id);

  res.json({
    message: 'Match deleted successfully',
  });
}
