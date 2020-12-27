import { Router, Request, Response } from 'express';
import { pool } from '../db/db';

import { authorizer } from '../middleware/authorization';
const router = Router();

router.post('/', authorizer, async (req: Request, res: Response) => {
  const user = await pool.query('SELECT user_name FROM users WHERE username = $1', [req.user]);
  res.json(user.rows[0]);
});

export { router };
