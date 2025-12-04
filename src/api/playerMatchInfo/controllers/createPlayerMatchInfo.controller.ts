import type { NextFunction, Response, Request } from 'express';
import type { IPlayerMatchInfoDocument } from '@/db/models/playerMatchInfo';
import { makePlayerMatchInfoData } from '@/utils/makeData';
import { createPlayerMatchInfoService } from '../services/createPlayerMatchInfo.service';

export async function createPlayerMatchInfoController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const playerMatchInfo = await createPlayerMatchInfoService(req.body);

  res.status(201).json({
    data: makePlayerMatchInfoData(playerMatchInfo as IPlayerMatchInfoDocument),
  });
}

