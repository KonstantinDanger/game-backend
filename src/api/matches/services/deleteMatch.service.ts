import createHttpError from 'http-errors';

import { IMatchDocument, MatchModel } from '@/db/models/match';

export async function deleteMatchService(id: string) {
  if (!id) {
    throw createHttpError(400, 'ID is required');
  }

  const match = (await MatchModel.findOne({
    _id: id,
    removedAt: null,
  })) as IMatchDocument;

  if (!match) {
    throw createHttpError(404, 'Match not found');
  }

  match.removedAt = new Date();
  await match.save();

  return match;
}

