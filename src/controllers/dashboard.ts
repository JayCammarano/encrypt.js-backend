import { Request, Response } from 'express';
import { pool } from "../db/db";
import { eventsSerializer } from "../models/events";

export const userEvents = async (req: Request, res: Response) => {
  const user = await pool.query("SELECT user_id, secret_key FROM users WHERE user_name = $1", [req.user.user]);
  const response = {user: user.rows[0],
                    events: await eventsSerializer(user.rows[0].user_id, user.rows[0].secret_key)}
  res.json(response);
}

export default userEvents