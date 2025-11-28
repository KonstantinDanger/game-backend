import initMongoDB from '@/db/initMongoDB';
import { startServer } from '@/server';

async function bootstrap() {
  await initMongoDB();
  startServer();
}

bootstrap();
