import bcrypt from 'bcrypt';
import { pool } from '../db/db';

export const userExists = async (username: string) => {
  const user = await pool.query('SELECT * FROM users WHERE user_name = $1', [username]);
  if (user.rows.length !== 0) {
    return 'User Already Exists';
  } else {
    return 'Carry on';
  }
};

export const bcryptPassword = async (password: string) => {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  return await bcrypt.hash(password, salt);
};

export const insertUser = async (username: string, password: string, secretKey: string) => {
  const user = await pool.query('INSERT INTO users (user_name, user_password, secret_key) VALUES ($1, $2, $3) RETURNING *', [username, password, secretKey]);
  return user.rows[0].user_name;
};
