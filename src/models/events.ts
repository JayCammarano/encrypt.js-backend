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

const lookupUserIDs = async (user: string) => {
  try {
    const user_id = await pool.query('SELECT user_id from users WHERE user_name = $1', [user])
    if (user_id) {
      return user_id.rows[0].user_id
    }
  } catch (error) {
    console.log(error)
  }  

}

export const addUsersToEvent = async (invitees: string[], event_id: number, creator_id: number) => {
  pool.query('INSERT INTO user_event (user_id, event_id, creator) VALUES ($1, $2, $3) RETURNING *', [creator_id, event_id, 1]);
  
  const invitee_ids: Promise<string[]> =  Promise.all(invitees.map(async (user: string) => {
   return lookupUserIDs(user)
  }));

  (await invitee_ids).forEach(async (user_id: string) => {
    try {
      await pool.query('INSERT INTO user_event (user_id, event_id, creator) VALUES ($1, $2, $3) RETURNING *', [user_id, event_id, 0]);
    } catch (error) {
      console.log(error)
    }
  });
}

export const insertEvent = async (encryptedEvent: string) => {
        const eventObject = await pool.query('INSERT INTO events (encrypted_event) VALUES ($1) RETURNING *', [encryptedEvent])
        return eventObject.rows[0].event_id
}
