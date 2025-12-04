import createHttpError from 'http-errors';

import { IMatchDocument, MatchModel } from '@/db/models/match';

export async function deleteMatchService(id: string) {
  if (!id) {
    throw createHttpError(400, 'ID is required');
  }

  const match = (await MatchModel.findOneAndUpdate(
    {
      _id: id,
      removedAt: null,
    },
    {
      removedAt: new Date(),
    },
  )) as IMatchDocument;

  return match;
}
