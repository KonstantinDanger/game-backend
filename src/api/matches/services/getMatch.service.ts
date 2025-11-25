import createHttpError from 'http-errors';

import { IMatchDocument, MatchModel } from '@/db/models/match.js';

export async function getMatchService(id: string) {
  try {
    const match = (await MatchModel.findById(id)) as IMatchDocument;

    if (!id) {
      throw createHttpError(400, 'ID is required');
    }

    if (!match) {
      throw createHttpError(404, 'Match not found');
    }

    return match;
  } catch (err) {
    throw err;
  }
}
