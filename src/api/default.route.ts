import { Request, Response } from 'express';

export default function defaultRoute(_req: Request, res: Response) {
  res.json({ message: 'Get method performed' });
}
