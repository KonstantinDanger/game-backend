import { SessionModel } from '@/db/models/session.js';

export async function logoutService(sessionId: string) {
  await SessionModel.deleteOne({ _id: sessionId });
}
