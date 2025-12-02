import type { NextFunction, Response, Request } from 'express';

import { deleteMatchService } from '../services/deleteMatch.service';

export async function deleteMatchController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  await deleteMatchService(req.params.id);

  res.json({
    message: 'Match deleted successfully',
  });
}

