import type { IPlayerDocument } from '@/db/models/player';

declare global {
  namespace Express {
    interface Request {
      user?: IPlayerDocument;
    }
  }
}

export {};
