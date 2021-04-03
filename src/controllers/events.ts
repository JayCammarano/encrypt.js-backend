import { Request, Response } from 'express';
import { pool } from '../db/db';
import { decrypt } from '../encryption/secretBox';
import {
  addUsersToEvent,
  findIDFromToken,
  insertEvent
} from '../models/events';

const newEvent = async (req: Request, res: Response) => {
  const { encryptedEvent } = req.body;
  const token = req.header('token');
  if (!token) {
    res.status(500).json('Not Authorized');
  } else {
    try {
      const creator = await findIDFromToken(token);
      const event_id = await insertEvent(encryptedEvent, creator.user_id);
      const decryptedEvent = decrypt(encryptedEvent, creator.secret_key);
      await addUsersToEvent(decryptedEvent.invitees, event_id, creator.user_id);
    } catch (error) {
      return error;
    }
  }
};

export const respondToInvite = async (req: Request, res: Response) => {
  const { invitedEvent, accepted } = req.body;
  const token = req.header('token');
  if (!token) {
    res.status(500).json('Not Authorized');
  } else {
    try {
      const userID = await findIDFromToken(token);
      console.log(req.body.accepted);
      if (accepted) {
        console.log(invitedEvent);

        const update = await pool.query(
          `UPDATE user_event SET accepted = TRUE WHERE event_id = $1 AND user_id = $2 RETURNING *`,
          [invitedEvent, userID.user_id]
        );
        if (update.rows[0].accepted) {
          res.status(200).json('Invite Accepted');
        } else {
          res.status(500).json('server error');
        }
      } else {
        pool.query(
          `DELETE FROM user_event WHERE event_id = $1 AND user_id = $2`,
          [invitedEvent, userID.user_id]
        );
        res.status(200).json('Invite Deleted');
      }
    } catch (error) {
      return error;
    }
  }
};
export default newEvent;
