import createHttpError from 'http-errors';

import { IMatchDocument, MatchModel } from '@/db/models/match';

export async function getMatchService(id: string) {
  if (!id) {
    throw createHttpError(400, 'ID is required');
  }

  const match = (await MatchModel.findById(id)) as IMatchDocument;

  if (!match) {
    throw createHttpError(404, 'Match not found');
  }

  return match;
}
