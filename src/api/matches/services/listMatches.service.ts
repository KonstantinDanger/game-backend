import { MatchModel } from '@/db/models/match.js';

export async function listMatchesService(query: {
  page?: string;
  perPage?: string;
}) {
  try {
    const page = parseInt(query.page as string) || 1;
    const perPage = parseInt(query.perPage as string) || 10;
    const skip = (page - 1) * perPage;

    const [list, total] = await Promise.all([
      MatchModel.find().sort({ createdAt: -1 }).skip(skip).limit(perPage),
      MatchModel.countDocuments(),
    ]);

    return {
      list,
      total,
    };
  } catch (err) {
    throw err;
  }
}
