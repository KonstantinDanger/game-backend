import { SessionModel } from '@/db/models/session';

export async function logoutService(sessionId: string | undefined) {
  if (!sessionId) {
    return;
  }

  await SessionModel.deleteOne({ _id: sessionId });
}
