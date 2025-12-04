import { MatchModel } from '@/db/models/match';
import { PlayerModel } from '@/db/models/player';
// import { match } from 'assert';

export async function getListMatchesService(query: {
  page?: string;
  perPage?: string;
}) {
  const page = parseInt(query.page as string) || 1;
  const perPage = parseInt(query.perPage as string) || 10;
  const skip = (page - 1) * perPage;

  const [list, totalCount] = await Promise.all([
    MatchModel.find({ removedAt: null })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage)
      .lean(),
    MatchModel.countDocuments({ removedAt: null }),
  ]);

  const matches = await Promise.all(
    list.map(async (match) => {
      const winner = await PlayerModel.findOne({ _id: match.winnerId });
      const loser = await PlayerModel.findOne({ _id: match.loserId });

      return {
        ...match,
        winner,
        loser,
      };
    }),
  );

  return {
    list: matches,
    totalCount,
  };
}
