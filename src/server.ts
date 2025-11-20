import express, { Request, Response, NextFunction } from 'express';
import pino from 'pino-http';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import { createProxyMiddleware } from 'http-proxy-middleware';
import getEnvVar from './utils/getEnvVar.js';
import dotenv from 'dotenv';
import authRoutes from './api/auth/auth.routes.js';

dotenv.config();

const PORT = Number(getEnvVar('PORT', '3000'));
const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';

// Получаем текущую директорию для ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь к собранному фронтенду
// В production может быть в папке public (после сборки в CI/CD) или рядом с проектом (локально)
const frontendDistPath = process.env.FRONTEND_DIST_PATH ||
  path.join(__dirname, '../../game-site/dist');

// Порт Vite dev-сервера
const VITE_DEV_PORT = Number(getEnvVar('VITE_DEV_PORT', '5173'));
const VITE_DEV_URL = `http://localhost:${VITE_DEV_PORT}`;

export function startServer() {
  const app = express();

  app.use(express.json());
  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.use(cors());
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Time: ${new Date().toLocaleDateString()}`);
    next();
  });

  // API роуты должны быть ДО статической раздачи или проксирования
  // Здесь будут подключены API роуты (например, /auth, /user, /players)
  app.use('/auth', authRoutes);

  // Временный роут для проверки API (можно удалить после добавления реальных роутов)
  app.get('/api', (req: Request, res: Response) => {
    res.json({ message: 'API is working' });
  });

  if (isDevelopment) {
    // В режиме разработки проксируем запросы к Vite dev-серверу
    console.log(`Development mode: proxying frontend requests to ${VITE_DEV_URL}`);

    app.use(
      createProxyMiddleware({
        target: VITE_DEV_URL,
        changeOrigin: true,
        ws: true, // для поддержки WebSocket (HMR)
      })
    );
  } else {
    // В production режиме раздаем статические файлы из папки dist
    const resolvedPath = path.resolve(frontendDistPath);

    if (!existsSync(resolvedPath)) {
      console.warn(`Warning: Frontend dist path does not exist: ${resolvedPath}`);
      console.warn('Make sure to build the frontend before starting the server in production mode');
    } else {
      console.log(`Production mode: serving static files from ${resolvedPath}`);
    }

    // Раздача статических файлов из папки dist фронтенда
    app.use(express.static(resolvedPath));

    // SPA fallback: все остальные GET запросы отправляем на index.html
    // Это должно быть последним, чтобы не перехватывать API запросы
    app.get('*', (req: Request, res: Response) => {
      const indexPath = path.join(resolvedPath, 'index.html');
      if (existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).json({
          message: 'Frontend not found. Please build the frontend first.',
          path: resolvedPath
        });
      }
    });
  }

  // Обработка ошибок должна быть после всех роутов и middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log('Server is running on port: ', PORT);
    if (isDevelopment) {
      console.log(`Frontend dev server should be running on: ${VITE_DEV_URL}`);
      console.log('Make sure to run "npm run dev" in the game-site directory');
    } else {
      console.log(`Frontend will be served from: ${frontendDistPath}`);
    }
  });
}
