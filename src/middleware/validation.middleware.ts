import type { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import createHttpError from 'http-errors';

export function validate(schema: z.ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const dataToValidate = {
        body: req.body,
        query: req.query,
        params: req.params,
      };

      const validated = schema.parse(dataToValidate) as {
        body?: unknown;
        query?: unknown;
        params?: unknown;
      };

      if (validated.body) req.body = validated.body;
      if (validated.query) {
        Object.assign(req.query, validated.query);
      }
      if (validated.params) {
        Object.assign(req.params, validated.params);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));

        return next(
          createHttpError(400, {
            message: 'Validation error',
            errors: errorMessages,
          }),
        );
      }
      next(error);
    }
  };
}

export function validateBody(schema: z.ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));

        return next(
          createHttpError(400, {
            message: 'Validation error',
            errors: errorMessages,
          }),
        );
      }
      next(error);
    }
  };
}

export function validateQuery(schema: z.ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse(req.query);
      Object.assign(req.query, validated);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));

        return next(
          createHttpError(400, {
            message: 'Validation error',
            errors: errorMessages,
          }),
        );
      }
      next(error);
    }
  };
}

export function validateParams(schema: z.ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse(req.params);
      Object.assign(req.params, validated);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));

        return next(
          createHttpError(400, {
            message: 'Validation error',
            errors: errorMessages,
          }),
        );
      }
      next(error);
    }
  };
}
