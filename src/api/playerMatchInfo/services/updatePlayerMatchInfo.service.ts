import {
  type IPlayerMatchInfoDocument,
  PlayerMatchInfoModel,
} from '@/db/models/playerMatchInfo';
import createHttpError from 'http-errors';
import { Types } from 'mongoose';

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
    playerMatchInfo.playerId = new Types.ObjectId(body.playerId);
  }

  if (body.matchId !== undefined) {
    playerMatchInfo.matchId = new Types.ObjectId(body.matchId);
  }

  if (body.playerClassId !== undefined) {
    playerMatchInfo.playerClassId = new Types.ObjectId(body.playerClassId);
  }

  if (body.slainBossesIds !== undefined) {
    playerMatchInfo.slainBossesIds = body.slainBossesIds.map(
      (id) => new Types.ObjectId(id),
    );
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
