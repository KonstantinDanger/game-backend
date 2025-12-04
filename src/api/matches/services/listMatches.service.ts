import { MatchModel } from '@/db/models/match';
import { PlayerModel } from '@/db/models/player';

export async function getListMatchesService(query: {
  page: number;
  perPage: number;
}) {
  const { page, perPage } = query;
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
