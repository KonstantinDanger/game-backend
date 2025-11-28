import { IPlayerDocument, PlayerModel } from '@/db/models/player';

export async function listPlayersService(query: {
  page?: string;
  perPage?: string;
}) {
  const page = parseInt(query.page as string) || 1;
  const perPage = parseInt(query.perPage as string) || 10;
  const skip = (page - 1) * perPage;

  const [list, totalPages]: [IPlayerDocument[], number] = await Promise.all([
    PlayerModel.find()
      .select('-passwordHash -passwordSalt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage),
    PlayerModel.countDocuments(),
  ]);

  return {
    list,
    totalPages,
  };
}
