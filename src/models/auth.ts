import bcrypt from 'bcryptjs';
import { pool } from '../db/db';

export const userExists = async (username: string) => {
  const user = await pool.query('SELECT * FROM users WHERE user_name = $1', [
    username
  ]);
  if (user.rows.length !== 0) {
    return true;
  } else {
    return false;
  }
};
export const getUser = async (username: string) => {
  const users = await pool.query('SELECT * FROM users WHERE user_name = $1', [
    username
  ]);
  return users.rows[0];
};

export const insertUser = async (
  username: string,
  password: string,
  secretKey: string
) => {
  const user = await pool.query(
    'INSERT INTO users (user_name, user_password, secret_key) VALUES ($1, $2, $3) RETURNING *',
    [username, password, secretKey]
  );
  return user.rows[0];
};

export const bcryptPassword = async (password: string) => {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  return await bcrypt.hash(password, salt);
};

export const bcryptCompare = async (
  dbPassword: string,
  clientPassword: string
) => {
  return await bcrypt.compare(clientPassword, dbPassword);
};
