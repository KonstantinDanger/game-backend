import type { Types } from 'mongoose';

import type { IPlayerDocument } from '../db/models/player';
import type { IMatchDocument } from '../db/models/match';
import type { IPlayerMatchInfoDocument } from '../db/models/playerMatchInfo';
import { ISessionDocument } from '@/db/models/session';

export function makePlayerData(
  player: IPlayerDocument,
  isCurrentUser?: boolean,
  isAdmin?: boolean,
) {
  return {
    id: (player._id as Types.ObjectId).toString(),
    name: player.name,
    email: isCurrentUser ? player.email : undefined,
    isAdmin: isCurrentUser || isAdmin ? player.isAdmin : undefined,
  };
}

export function makeMatchData(
  match: IMatchDocument &
    Partial<{
      winner?: IPlayerDocument;
      loser?: IPlayerDocument;
    }>,
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

export function makePlayerMatchInfoData(
  playerMatchInfo: IPlayerMatchInfoDocument,
) {
  return {
    id: (playerMatchInfo._id as Types.ObjectId).toString(),
    playerId: (playerMatchInfo.playerId as Types.ObjectId).toString(),
    matchId: (playerMatchInfo.matchId as Types.ObjectId).toString(),
    playerClassId: (playerMatchInfo.playerClassId as Types.ObjectId).toString(),
    slainBossesIds:
      playerMatchInfo.slainBossesIds?.map((id) =>
        (id as Types.ObjectId).toString(),
      ) || [],
    dealtDamage: playerMatchInfo.dealtDamage,
    reachedLevel: playerMatchInfo.reachedLevel,
    totalXpReceived: playerMatchInfo.totalXpReceived,
    deathsCount: playerMatchInfo.deathsCount,
    currencyReceived: playerMatchInfo.currencyReceived,
  };
}
