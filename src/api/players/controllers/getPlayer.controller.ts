import type { NextFunction, Response, Request } from 'express';
import { getPlayerService } from '../services/getPlayer.service';
import { makePlayerData, makeMatchData } from '@/utils/makeData';

export async function getPlayerController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { player, matches } = await getPlayerService(req.params.id);
  const isAdmin = req.body?.user?.isAdmin === true;

  res.json({
    data: {
      ...makePlayerData(player, isAdmin),
      matches: matches.map((match) => makeMatchData(match)),
      totalMatchTime: matches.reduce(
        (total, match) => total + match.matchTime,
        0,
      ),
    },
  });
}
