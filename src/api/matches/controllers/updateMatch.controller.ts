import type { NextFunction, Response, Request } from 'express';

import type { IMatchDocument } from '@/db/models/match.js';
import { makeMatchData } from '@/utils/makeData.js';
import { updateMatchService } from '../services/updateMatch.service.js';

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
