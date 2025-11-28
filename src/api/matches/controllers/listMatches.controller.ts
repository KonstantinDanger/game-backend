import type { NextFunction, Response, Request } from 'express';

import { listMatchesService } from '../services/listMatches.service.js';
import { makeMatchData } from '@/utils/makeData.js';
import { IMatchDocument } from '@/db/models/match.js';

export async function listMatchesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { list, totalPages } = await listMatchesService(req.query);

    res.json({
      data: {
        list: list.map((match) => makeMatchData(match as IMatchDocument)),
        totalPages,
      },
    });
  } catch (err) {
    next(err);
  }
}
