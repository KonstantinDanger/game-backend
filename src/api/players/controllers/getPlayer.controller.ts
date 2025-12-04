import type { NextFunction, Response, Request } from 'express';
import { getPlayerService } from '../services/getPlayer.service';

export async function getPlayerController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { player, matches } = await getPlayerService(
    req.params.id,
    req.user?.isAdmin === true,
  );

  res.json({
    data: {
      player,
      matches,
      totalMatchTime: matches.reduce(
        (total, match) => total + match.matchTime,
        0,
      ),
    },
  });
}
