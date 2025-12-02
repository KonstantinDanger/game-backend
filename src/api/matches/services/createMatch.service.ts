import { MatchModel } from '@/db/models/match';
import createHttpError from 'http-errors';

export async function createMatchService(body: {
  name: string;
  matchTime: Date;
  matchDate: Date;
}) {
  const { name, matchTime, matchDate } = body;

  if (!name || !matchTime || !matchDate) {
    throw createHttpError(400, 'name, matchTime and matchDate are required');
  }

  const match = await MatchModel.create({
    name,
    matchTime,
    matchDate,
  });

  await match.save();

  return match;
}
