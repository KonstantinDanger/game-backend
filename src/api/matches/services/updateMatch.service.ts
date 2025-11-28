import { type IMatchDocument, MatchModel } from '@/db/models/match';
import createHttpError from 'http-errors';

export async function updateMatchService(
  body: {
    matchTime?: Date;
    matchDate?: Date;
  },
  id: string,
) {
  const { matchTime, matchDate } = body;

  const match = (await MatchModel.findById(id)) as IMatchDocument;

  if (!match) {
    throw createHttpError(404, 'Match not found');
  }

  if (matchTime !== undefined) {
    match.matchTime = matchTime;
  }

  if (matchDate !== undefined) {
    match.matchDate = matchDate;
  }

  await match.save();

  return match;
}
