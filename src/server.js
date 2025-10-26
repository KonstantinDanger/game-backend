import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import getEnvVar from './utils/getEnvVar.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(getEnvVar('PORT', '3000'));

export function startServer() {
  const app = express();

  app.use(express.json());
  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.use(cors());
  app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleDateString()}`);
    next();
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.get('/', (req, res) => {
    res.json({ message: 'Get method performed' });
  });

  app.use('{/*any}', (req, res, next) => {
    res.status(404).json({ message: 'Path not found' });
  });

  app.listen(PORT, () => {
    console.log('Server is running on port: ', PORT);
  });
}
