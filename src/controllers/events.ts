import { Request, Response } from 'express';
import { decrypt } from "../encryption/secretBox";
import { addUsersToEvent, findCreatorIDFromToken, insertEvent } from "../models/events";

const newEvent = async (req: Request, res: Response) => {
    const { encryptedEvent } = req.body;
    const token = req.header('token');
    if(!token){
      res.status(500).json('Not Authorized')
    }
    else{
      try {
        const creator = await findCreatorIDFromToken(token)
        const event_id = await insertEvent(encryptedEvent, creator.user_id)
        const decryptedEvent = decrypt(encryptedEvent, creator.secret_key)
        await addUsersToEvent(decryptedEvent.invitees, event_id, creator.user_id)
      } catch (error) {
        return error
      }
    }
}

export default newEvent;