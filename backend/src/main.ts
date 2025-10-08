import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const NODE_ENV = configService.get<string>('NODE_ENV');
  const isDevelopment = NODE_ENV === 'development';

  const allowedOrigins = configService.get<string>('ALLOWED_ORIGINS');

  const origins = allowedOrigins
    ? allowedOrigins.split(',').map((origin) => origin.trim())
    : [];

  app.enableCors({
    origin: isDevelopment ? '*' : origins,
    credentials: true,
  });

  app.setGlobalPrefix('/api/v1');

  const API_PORT = configService.get<number>('API_PORT', 3001);

  await app.listen(API_PORT, () => {
    console.log(`🚀 API listening on port ${API_PORT}, NODE_ENV=${NODE_ENV}`);
    console.log(
      `🔒 CORS enabled for: ${isDevelopment ? '*' : origins.join(', ')}`,
    );
  });
}

void bootstrap();
