import type { NextFunction, Response, Request } from 'express';

import type { IMatchDocument } from '@/db/models/match';
import { makeMatchData } from '@/utils/makeData';
import { updateMatchService } from '../services/updateMatch.service';

export async function updateMatchController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const match = await updateMatchService(req.body, req.params.id);

  res.json({
    data: makeMatchData(match as IMatchDocument),
  });
}
