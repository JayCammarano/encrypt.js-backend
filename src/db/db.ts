import { Pool } from 'pg';

export const pool: Pool = new Pool({
  user: process.env.DB_USERNAME || 'postgres',
  host: process.env.DBHOST ||'localhost',
  port: 5432,
  database: process.env.DBNAME || 'encrypted_events_ts_' + process.env.NODE_ENV
});
