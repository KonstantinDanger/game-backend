import type { NextFunction, Response, Request } from 'express';
import { IMatchDocument } from '@/db/models/match';
import { makeMatchData } from '@/utils/makeData';
import { createMatchService } from '../services/createMatch.service';

export async function createMatchController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const match = await createMatchService(req.body);

  res.status(201).json({
    data: makeMatchData(match as IMatchDocument),
  });
}
