import type { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

export default function errorHandlerRoute(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    return next(err);
  }

  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString(),
  });

  if (createHttpError.isHttpError(err)) {
    return res.status(err.statusCode).json({
      message: err.message,
      status: err.statusCode,
    });
  }

  return res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
}
