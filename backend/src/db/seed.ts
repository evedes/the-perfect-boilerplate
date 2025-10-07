import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { users } from './schema';

function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

async function seed() {
  const isProduction = process.env.NODE_ENV === 'production';

  const pool = new Pool({
    host: getRequiredEnv('POSTGRES_HOST'),
    port: Number(getRequiredEnv('POSTGRES_PORT')),
    user: getRequiredEnv('POSTGRES_USER'),
    password: getRequiredEnv('POSTGRES_PASSWORD'),
    database: getRequiredEnv('POSTGRES_DB'),
    ssl: isProduction ? { rejectUnauthorized: false } : false,
  });

  const db = drizzle(pool);

  console.log('🌱 Starting seed...');

  try {
    await db
      .insert(users)
      .values({
        email: process.env.SEED_USER_EMAIL ?? 'john.doe@example.com',
        firstName: process.env.SEED_USER_FIRST_NAME ?? 'John',
        lastName: process.env.SEED_USER_LAST_NAME ?? 'Doe',
      })
      .onConflictDoNothing();

    console.log('✅ Seed completed successfully!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

void seed();
