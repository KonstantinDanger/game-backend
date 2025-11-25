import { Request, Response, NextFunction } from 'express';

export default function errorHandlerRoute(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
}
