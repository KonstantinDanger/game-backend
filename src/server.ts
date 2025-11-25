import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import getEnvVar from '@/utils/getEnvVar.js';
import dotenv from 'dotenv';
import authRoutes from '@/api/auth/auth.routes.js';
import matchesRoutes from '@/api/matches/matches.routes.js';
import playersRoutes from '@/api/players/players.routes.js';
import cookieParser from 'cookie-parser';
import defaultRoute from '@/api/default.route.js';
import notFoundRoute from '@/api/notFound.route.js';
import errorHandlerRoute from '@/api/errorHandler.route.js';

dotenv.config();

const PORT = Number(getEnvVar('PORT', '3000'));

export function startServer() {
  const app = express();

  app.use(express.json());
  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.use(
    cors(
      getEnvVar('NODE_ENV') === 'dev'
        ? {
            origin: getEnvVar('FRONTEND_URL'),
            credentials: true,
          }
        : undefined,
    ),
  );
  app.use(cookieParser());

  app.get('/', defaultRoute);
  app.use('/api/auth', authRoutes);
  app.use('/api/matches', matchesRoutes);
  app.use('/api/players', playersRoutes);
  app.use(notFoundRoute);
  app.use(errorHandlerRoute);

  app.listen(PORT, () => {
    console.log('Server is running on port: ', PORT);
  });
}
