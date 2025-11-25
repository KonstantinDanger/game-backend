import { Request, Response } from 'express';

export default function notFoundRoute(req: Request, res: Response) {
  res.status(404).json({ message: 'Path not found' });
}
