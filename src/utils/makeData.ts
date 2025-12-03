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
    loser?: IPlayerDocument | null;
  },
) {
  return {
    id: (match._id as Types.ObjectId).toString(),
    matchTime: match.matchTime,
    matchDate: match.matchDate,
    winner: match.winner,
    loser: match.loser,
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
