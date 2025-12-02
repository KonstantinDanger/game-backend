import type { Types } from 'mongoose';

import type { IPlayerDocument } from '../db/models/player';
import type { IMatchDocument } from '../db/models/match';
import { ISessionDocument } from '@/db/models/session';

export function makePlayerData(player: IPlayerDocument, isAdmin?: boolean) {
  return {
    id: (player._id as Types.ObjectId).toString(),
    name: player.name,
    email: player.email,
    isAdmin: isAdmin ? player.isAdmin : undefined,
    playedMatchesCount: player.playedMatchesIds?.length || 0,
  };
}

export function makeMatchData(
  match: IMatchDocument & {
    winner?: IPlayerDocument | null;
    looser?: IPlayerDocument | null;
  },
) {
  const winner = match.winner ? makePlayerData(match.winner) : null;
  const looser = match.looser ? makePlayerData(match.looser) : null;

  return {
    id: (match._id as Types.ObjectId).toString(),
    name: match.name,
    matchTime: match.matchTime,
    matchDate: match.matchDate,
    winner,
    looser,
  };
}

export function makeSessionData(session: ISessionDocument) {
  return {
    id: (session._id as Types.ObjectId).toString(),
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
    accessTokenValidUntil: session.accessTokenValidUntil,
    refreshTokenValidUntil: session.refreshTokenValidUntil,
  };
}
