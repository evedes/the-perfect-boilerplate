import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.setGlobalPrefix('/api/v1');

  const API_PORT = configService.get<number>('API_PORT', 3001);
  const NODE_ENV = configService.get<string>('NODE_ENV');

  await app.listen(API_PORT, () => {
    console.log(`🚀 API listening on port ${API_PORT}, NODE_ENV=${NODE_ENV}`);
  });
}

void bootstrap();
