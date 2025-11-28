import { MatchModel } from '@/db/models/match';

export async function listMatchesService(query: {
  page?: string;
  perPage?: string;
}) {
  const page = parseInt(query.page as string) || 1;
  const perPage = parseInt(query.perPage as string) || 10;
  const skip = (page - 1) * perPage;

  const [list, totalCount] = await Promise.all([
    MatchModel.find().sort({ createdAt: -1 }).skip(skip).limit(perPage),
    MatchModel.countDocuments(),
  ]);

  return {
    list,
    totalCount,
  };
}
