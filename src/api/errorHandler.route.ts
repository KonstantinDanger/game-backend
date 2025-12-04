import type { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

export default function errorHandlerRoute(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    return next(err);
  }

  if (createHttpError.isHttpError(err)) {
    const response: {
      message: string;
      status: number;
      errors?: unknown;
    } = {
      message: err.message,
      status: err.statusCode,
    };

    if (typeof err === 'object' && err !== null && 'errors' in err) {
      response.errors = (err as unknown as { errors: unknown }).errors;
    }

    return res.status(err.statusCode).json(response);
  }

  const isProduction = process.env.NODE_ENV === 'production';

  return res.status(500).json({
    message: 'Something went wrong',
    ...(isProduction ? {} : { error: err.message }),
  });
}
