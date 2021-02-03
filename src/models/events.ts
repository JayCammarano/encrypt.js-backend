import { pool } from "../db/db"
import { verifyJWT } from "../models/jwt"

// add the encrypted_event string, return event_id
// create event_user associations:
    // get creator by decrypting token
    // get creator's pk
    // decrypt event with creator's pk
    // cycle through event.invitees and add them to the event with creator field 0
    // add creator with creator field 1

export const findCreator = async (token: string) => {
  try {
    const payload: any = verifyJWT(token)
    if (payload) {
        const creator = await pool.query('SELECT * from users WHERE user_name = $1', [payload.user])
        return creator.rows[0]
    }
  } catch (err) {
    console.error(err.message);
  }
}

export const insertEvent = async (encryptedEvent: string) => {
        const eventObject = await pool.query('INSERT INTO events (encrypted_event) VALUES ($1) RETURNING *', [encryptedEvent])
        return eventObject.rows[0].event_id
    // const invitee_ids = decryptedEventObject.invitees.map(async (user: string) => {
    //     return await pool.query('SELECT user_id from "Users" WHERE user_name = $1', [user])
    // })
    // const event_id = await pool.query('INSERT INTO events (encrypted_event, creator_id) VALUES ($1, $2) RETURNING event_id', [decryptedEventObject.encrypted_event, creator_id]);
    
    // pool.query('INSERT INTO user_event (user_id, event_id) VALUES ($1, $2) RETURNING *', [creator_id, event_id]);
    
    // invitee_ids.forEach((user_id: string)  => {
    //     pool.query('INSERT INTO user_event (user_id, event_id) VALUES ($1, $2) RETURNING *', [user_id, event_id]);
    // });
    
}


const newEvent = (req: Request) => {
    console.log(req.body)
}
export default newEvent;