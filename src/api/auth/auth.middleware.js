import { SessionModel } from '../../db/models/session.js';

export async function authorize(req, res, next) {
  try {
    const authHeader = req.header('Authorization') || '';
    const token = authHeader.replace('Bearer ', '');

    if (!token) {
      throw new Error('Auth token not provided');
    }

    const session = await SessionModel.findSessionByToken(token);
    if (!session) {
      throw new Error('Auth token is not valid');
    }

    req.user = session.user;
    req.token = session.token;
    next();
  } catch (err) {
    next(err);
  }
}

