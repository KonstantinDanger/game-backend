import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import getEnvVar from '@/utils/getEnvVar';
import dotenv from 'dotenv';
import authRoutes from '@/api/auth/auth.routes';
import matchesRoutes from '@/api/matches/matches.routes';
import playersRoutes from '@/api/players/players.routes';
import cookieParser from 'cookie-parser';
import defaultRoute from '@/api/default.route';
import notFoundRoute from '@/api/notFound.route';
import errorHandlerRoute from '@/api/errorHandler.route';

dotenv.config();

const PORT = Number(getEnvVar('PORT', '3000'));

export function startServer() {
  const app = express();

  app.use(express.json());
  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.use(
    cors({
      origin:
        getEnvVar('NODE_ENV') === 'production'
          ? getEnvVar('FRONTEND_PROD_URL')
          : getEnvVar('FRONTEND_DEV_URL'),
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['Set-Cookie'],
    }),
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
