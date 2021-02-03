import { Router, Request, Response } from 'express';
import { pool } from '../db/db';

import { authorizer } from '../middleware/authorization';
const router = Router();

router.get('/dashboard', authorizer, async (req: Request, res: Response) => {
  const user = await pool.query("SELECT user_name, secret_key FROM users WHERE user_name = $1", [req.user.user]);
  res.json(user.rows[0]);
});

export { router };
