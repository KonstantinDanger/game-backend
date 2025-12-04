import type { NextFunction, Response, Request } from 'express';
import { getListMatchesService } from '../services/listMatches.service';
import { makeMatchData } from '@/utils/makeData';
import { IMatchDocument } from '@/db/models/match';

export async function listMatchesController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { list, totalCount } = await getListMatchesService(req.query);

  res.json({
    data: {
      list: list.map((match) =>
        makeMatchData(match as unknown as IMatchDocument),
      ),
      totalCount,
    },
  });
}
