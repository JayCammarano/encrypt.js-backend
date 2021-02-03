import { Pool } from 'pg';

export const pool: Pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'encrypted_events_ts'
});
