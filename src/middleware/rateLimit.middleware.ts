import rateLimit from 'express-rate-limit';
import type { Request, Response } from 'express';

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    error: 'Too many authentication attempts, please try again later',
    retryAfter: '15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req: Request, res: Response) => {
    res.status(429).json({
      message: 'Too many authentication attempts, please try again later',
      retryAfter: '15 minutes',
    });
  },
  keyGenerator: (req: Request) => {
    return (
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      req.ip ||
      req.socket.remoteAddress ||
      'unknown'
    );
  },
});

export const generalRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: {
    error: 'Too many requests from this IP, please try again later',
    retryAfter: '1 minute',
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req: Request, res: Response) => {
    res.status(429).json({
      message: 'Too many requests from this IP, please try again later',
      retryAfter: '1 minute',
    });
  },
  keyGenerator: (req: Request) => {
    return (
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      req.ip ||
      req.socket.remoteAddress ||
      'unknown'
    );
  },
});

export const writeRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  message: {
    error: 'Too many write operations, please try again later',
    retryAfter: '1 minute',
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req: Request, res: Response) => {
    res.status(429).json({
      message: 'Too many write operations, please try again later',
      retryAfter: '1 minute',
    });
  },
  keyGenerator: (req: Request) => {
    return (
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      req.ip ||
      req.socket.remoteAddress ||
      'unknown'
    );
  },
  skip: (req: Request) => {
    return !['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method);
  },
});
