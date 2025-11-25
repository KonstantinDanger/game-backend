import { Request, Response } from 'express';

export default function defaultRoute(req: Request, res: Response) {
  res.json({ message: 'Get method performed' });
}
