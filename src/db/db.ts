import { Pool } from 'pg';
const connectionString = process.env.DATABASE_URL+"?ssl=true"

export const pool = new Pool({
  connectionString,
})