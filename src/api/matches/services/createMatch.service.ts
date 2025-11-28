import { MatchModel } from '@/db/models/match';
import createHttpError from 'http-errors';

export async function createMatchService(body: {
  matchTime: Date;
  matchDate: Date;
}) {
  const { matchTime, matchDate } = body;

  if (!matchTime || !matchDate) {
    throw createHttpError(400, 'matchTime and matchDate are required');
  }

  const match = await MatchModel.create({
    matchTime,
    matchDate,
  });

  await match.save();

  return match;
}
