import type { NextFunction, Response, Request } from 'express';
import { IMatchDocument } from '@/db/models/match.js';
import { getMatchService } from '../services/getMatch.service.js';
import { makeMatchData } from '@/utils/makeData.js';

export async function getMatchController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const match = await getMatchService(req.params.id);

    res.json({
      data: makeMatchData(match as IMatchDocument),
    });
  } catch (err) {
    next(err);
  }
}
