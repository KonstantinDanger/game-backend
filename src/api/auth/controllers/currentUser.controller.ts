import type { NextFunction, Response, Request } from 'express';
import { getCurrentUserService } from '../services/currentUser.service.js';

export async function currentUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await getCurrentUserService(
      req.cookies.sessionId,
      req.cookies.refreshToken,
    );

    res.json({ data: user });
  } catch (err) {
    next(err);
  }
}
