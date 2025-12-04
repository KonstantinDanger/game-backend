import type { NextFunction, Response, Request } from 'express';
import type { IPlayerMatchInfoDocument } from '@/db/models/playerMatchInfo';
import { makePlayerMatchInfoData } from '@/utils/makeData';
import { updatePlayerMatchInfoService } from '../services/updatePlayerMatchInfo.service';

export async function updatePlayerMatchInfoController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const playerMatchInfo = await updatePlayerMatchInfoService(
    req.body,
    req.params.id,
  );

  res.json({
    data: makePlayerMatchInfoData(playerMatchInfo as IPlayerMatchInfoDocument),
  });
}

