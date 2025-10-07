import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { users } from './schema';

async function seed() {
  const isProduction = process.env.NODE_ENV === 'production';

  const pool = new Pool({
    host: process.env.POSTGRES_HOST!,
    port: Number(process.env.POSTGRES_PORT!),
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DB!,
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
