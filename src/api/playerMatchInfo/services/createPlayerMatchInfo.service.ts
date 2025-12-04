import { PlayerMatchInfoModel } from '@/db/models/playerMatchInfo';
import createHttpError from 'http-errors';

export async function createPlayerMatchInfoService(body: {
  playerId: string;
  matchId: string;
  playerClassId: string;
  slainBossesIds?: string[];
  dealtDamage?: number;
  reachedLevel?: number;
  totalXpReceived?: number;
  deathsCount?: number;
  currencyReceived?: number;
}) {
  const {
    playerId,
    matchId,
    playerClassId,
    slainBossesIds,
    dealtDamage,
    reachedLevel,
    totalXpReceived,
    deathsCount,
    currencyReceived,
  } = body;

  if (!playerId || !matchId || !playerClassId) {
    throw createHttpError(400, 'playerId, matchId, playerClassId are required');
  }

  const playerMatchInfo = await PlayerMatchInfoModel.create({
    playerId,
    matchId,
    playerClassId,
    slainBossesIds: slainBossesIds || [],
    dealtDamage,
    reachedLevel,
    totalXpReceived,
    deathsCount,
    currencyReceived,
  });

  await playerMatchInfo.save();

  return playerMatchInfo;
}
