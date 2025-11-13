import express from 'express';
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
  app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleDateString()}`);
    next();
  });

  app.get('/', (req, res) => {
    res.json({ message: 'Get method performed' });
  });

  // Auth routes
  app.use('/api/auth', authRoutes);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ message: 'Path not found' });
  });

  // Error handler (must be last)
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log('Server is running on port: ', PORT);
  });
}
