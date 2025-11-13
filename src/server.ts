import express, { Request, Response, NextFunction } from 'express';
import pino from 'pino-http';
import cors from 'cors';
import getEnvVar from './utils/getEnvVar.js';
import dotenv from 'dotenv';
import authRoutes from './api/auth/auth.routes.js';

dotenv.config();

const PORT = Number(getEnvVar('PORT', '3000'));

export function startServer() {
  const app = express();

  app.use(express.json());
  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.use(cors());
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Time: ${new Date().toLocaleDateString()}`);
    next();
  });

  app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Get method performed' });
  });

  app.use('/api/auth', authRoutes);

  app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Path not found' });
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log('Server is running on port: ', PORT);
  });
}
