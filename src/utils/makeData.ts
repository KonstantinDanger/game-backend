import type { Types } from 'mongoose';

import type { IPlayerDocument } from '../db/models/player';
import type { IMatchDocument } from '../db/models/match';
import { ISessionDocument } from '@/db/models/session';

export function makePlayerData(player: IPlayerDocument) {
  return {
    id: (player._id as Types.ObjectId).toString(),
    name: player.name,
    email: player.email,
  };
}

export function makeMatchData(match: IMatchDocument) {
  return {
    id: (match._id as Types.ObjectId).toString(),
    matchTime: match.matchTime,
    matchDate: match.matchDate,
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
