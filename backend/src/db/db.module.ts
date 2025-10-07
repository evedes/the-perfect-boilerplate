import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction =
          configService.get<string>('NODE_ENV') === 'production';

        const pool = new Pool({
          host: configService.get<string>('POSTGRES_HOST', 'localhost'),
          port: configService.get<number>('POSTGRES_PORT', 5432),
          user: configService.get<string>('POSTGRES_USER', 'root'),
          password: configService.get<string>('POSTGRES_PASSWORD', 'root'),
          database: configService.get<string>(
            'POSTGRES_DB',
            'the-perfect-boilerplate',
          ),
          ssl: isProduction ? { rejectUnauthorized: false } : false,
        });

        return drizzle(pool, { schema });
      },
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DbModule {}
