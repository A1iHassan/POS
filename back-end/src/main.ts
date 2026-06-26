import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:5173', 'https://pos.roarisolutions.com'],
      credentials: true,
    },
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
