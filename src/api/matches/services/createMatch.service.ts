import { MatchModel } from '@/db/models/match.js';
import createHttpError from 'http-errors';

export async function createMatchService(body: {
  matchTime: Date;
  matchDate: Date;
}) {
  try {
    const { matchTime, matchDate } = body;

    if (matchTime === undefined || matchDate === undefined) {
      throw createHttpError(400, 'matchTime and matchDate are required');
    }

    const match = await MatchModel.create({
      matchTime,
      matchDate,
    });

    await match.save();

    return match;
  } catch (err) {
    throw err;
  }
}
