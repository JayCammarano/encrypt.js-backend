import { Request, Response } from 'express';
import { insertEvent, findCreator, addUsersToEvent} from "../models/events"
import { decrypt } from "../encryption/secretBox"

const newEvent = async (req: Request, res: Response) => {
    const { encryptedEvent } = req.body;
    const token = req.header('token');
    const event_id = await insertEvent(encryptedEvent)
    if(!token){
      res.status(500).send('Not Authorized')
    }
    else{
      try {
        const creator = await findCreator(token)
        const decryptedEvent = decrypt(encryptedEvent, creator.secret_key)
        addUsersToEvent(decryptedEvent.invitees, event_id, creator.user_id)
        res.status(200).send('success')
      } catch (error) {
        res.status(500).send('Errors: \n' + error)
      }
    }
}

export default newEvent;