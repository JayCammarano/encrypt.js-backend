import { Pool } from 'pg';

export const pool: Pool = new Pool({
  user: process.env.POSTGRES_USER|| 'postgres',
  host: process.env.POSTGRES_HOST ||'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB || 'encrypted_events_ts_' + process.env.NODE_ENV
});
