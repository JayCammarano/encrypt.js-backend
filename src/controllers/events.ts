import { Request } from 'express';
import { insertEvent, findCreator, addUsersToEvent} from "../models/events"
import {decrypt} from "../encryption/secretBox"

const newEvent = async (req: Request) => {
    const { encrypted_event } = req.body;
    const token = req.header('token');
    const event_id = await insertEvent(encrypted_event)
    if(!token){
     
    }
    else{
      const creator = await findCreator(token)
      const decryptedEvent = decrypt(encrypted_event, creator.secret_key)
      addUsersToEvent(decryptedEvent.invitees, event_id, creator.user_id)
    }
}

export default newEvent;