const { defineConfig } = require('drizzle-kit');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = defineConfig({
  schema: isProduction ? './dist/db/schema.js' : './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
  },
});
