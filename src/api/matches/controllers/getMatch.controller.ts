import type { NextFunction, Response, Request } from 'express';
import { getMatchService } from '../services/getMatch.service';
import { makeMatchData } from '@/utils/makeData';

export async function getMatchController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const match = await getMatchService(req.params.id);

  res.json({
    data: makeMatchData(match),
  });
}
