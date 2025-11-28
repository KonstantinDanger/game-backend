import type { NextFunction, Response, Request } from 'express';

import { listMatchesService } from '../services/listMatches.service.js';
import { makeMatchData } from '@/utils/makeData.js';
import { IMatchDocument } from '@/db/models/match.js';

export async function listMatchesController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { list, totalPages } = await listMatchesService(req.query);

  res.json({
    data: {
      list: list.map((match) => makeMatchData(match as IMatchDocument)),
      totalPages,
    },
  });
}
