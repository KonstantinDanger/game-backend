import { MatchModel } from '@/db/models/match';

export async function createMatchService(body: {
  name: string;
  matchTime: Date;
  matchDate: Date;
}) {
  const { name, matchTime, matchDate } = body;

  const match = await MatchModel.create({
    name,
    matchTime,
    matchDate,
  });

  await match.save();

  return match;
}
