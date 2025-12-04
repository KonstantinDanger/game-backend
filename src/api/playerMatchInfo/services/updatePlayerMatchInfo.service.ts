import {
  type IPlayerMatchInfoDocument,
  PlayerMatchInfoModel,
} from '@/db/models/playerMatchInfo';
import createHttpError from 'http-errors';

export async function updatePlayerMatchInfoService(
  body: {
    playerId?: string;
    matchId?: string;
    playerClassId?: string;
    slainBossesIds?: string[];
    dealtDamage?: number;
    reachedLevel?: number;
    totalXpReceived?: number;
    deathsCount?: number;
    currencyReceived?: number;
  },
  id: string,
) {
  const playerMatchInfo = (await PlayerMatchInfoModel.findById(
    id,
  )) as IPlayerMatchInfoDocument;

  if (!playerMatchInfo) {
    throw createHttpError(404, 'PlayerMatchInfo not found');
  }

  if (body.playerId !== undefined) {
    playerMatchInfo.playerId = body.playerId as any;
  }

  if (body.matchId !== undefined) {
    playerMatchInfo.matchId = body.matchId as any;
  }

  if (body.playerClassId !== undefined) {
    playerMatchInfo.playerClassId = body.playerClassId as any;
  }

  if (body.slainBossesIds !== undefined) {
    playerMatchInfo.slainBossesIds = body.slainBossesIds as any;
  }

  if (body.dealtDamage !== undefined) {
    playerMatchInfo.dealtDamage = body.dealtDamage;
  }

  if (body.reachedLevel !== undefined) {
    playerMatchInfo.reachedLevel = body.reachedLevel;
  }

  if (body.totalXpReceived !== undefined) {
    playerMatchInfo.totalXpReceived = body.totalXpReceived;
  }

  if (body.deathsCount !== undefined) {
    playerMatchInfo.deathsCount = body.deathsCount;
  }

  if (body.currencyReceived !== undefined) {
    playerMatchInfo.currencyReceived = body.currencyReceived;
  }

  await playerMatchInfo.save();

  return playerMatchInfo;
}

