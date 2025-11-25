import type { NextFunction, Response, Request } from 'express';
import { IMatchDocument } from '@/db/models/match.js';
import { makeMatchData } from '@/utils/makeData.js';
import { createMatchService } from '../services/createMatch.service.js';

export async function createMatchController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const match = await createMatchService(req.body);

    res.status(201).json({
      data: makeMatchData(match as IMatchDocument),
    });
  } catch (err) {
    next(err);
  }
}
