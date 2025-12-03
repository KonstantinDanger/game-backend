import type { NextFunction, Response, Request } from 'express';
import { listMatchesService } from '../services/listMatches.service';

export async function listMatchesController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { list, totalCount } = await listMatchesService(req.query);

  res.json({
    data: {
      list,
      totalCount,
    },
  });
}
