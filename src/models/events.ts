import { pool } from '../db/db';
import { decrypt, encrypt } from '../encryption/secretBox';
import { verifyJWT } from '../models/jwt';
import { SortedEvents } from './types';

export const findIDFromToken = async (token: string) => {
  const payload: any = verifyJWT(token);
  try {
    if (payload) {
      const user = await pool.query(
        'SELECT * from users WHERE user_name = $1',
        [payload.user]
      );
      return user.rows[0];
    }
  } catch (err) {
    console.log(err);
  }
};

export const findCreatorSecretKey = async (creator_id: string) => {
  try {
    const creator = await pool.query(
      'SELECT secret_key from users WHERE user_id = $1',
      [creator_id]
    );
    return creator.rows[0].secret_key;
  } catch (err) {
    console.error('findCreator' + err.message);
  }
};

export const findCreator = async (creator_id: string) => {
  try {
    const creator = await pool.query(
      'SELECT secret_key from users WHERE user_id = $1',
      [creator_id]
    );
    return creator.rows[0];
  } catch (err) {
    console.error('findCreator' + err.message);
  }
};

const lookupUserIDs = async (user: string) => {
  try {
    const user_id = await pool.query(
      'SELECT user_id from users WHERE user_name = $1',
      [user]
    );
    if (user_id.rows[0]) {
      return user_id.rows[0].user_id;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addUsersToEvent = async (
  invitees: string[],
  event_id: number,
  creator_id: number
) => {
  pool.query(
    'INSERT INTO user_event (user_id, event_id, creator, accepted) VALUES ($1, $2, $3, $4) RETURNING *',
    [creator_id, event_id, 1, true]
  );

  const invitee_ids: Promise<string[]> = Promise.all(
    invitees.map(async (user: string) => {
      const userID = lookupUserIDs(user);
      if (userID) {
        return userID;
      }
      return undefined;
    })
  );

  (await invitee_ids).forEach(async (user_id: string) => {
    try {
      if (user_id) {
        await pool.query(
          'INSERT INTO user_event (user_id, event_id, creator) VALUES ($1, $2, $3)',
          [user_id, event_id, 0]
        );
      }
    } catch (error) {
      console.log(error);
    }
  });
};

export const decryptEvent = (event: string, privateKey: string) => {
  return decrypt(event, privateKey);
};

export const encryptEvent = (event: object, privateKey: string) => {
  return encrypt(event, privateKey);
};

export const insertEvent = async (
  encryptedEvent: string,
  creatorId: string
) => {
  const eventObject = await pool.query(
    'INSERT INTO events (encrypted_event, creator_id) VALUES ($1, $2) RETURNING event_id;',
    [encryptedEvent, creatorId]
  );
  return eventObject.rows[0].event_id;
};

export const userEventIDLookup = async (user_id: string) => {
  const events = await pool.query(
    'SELECT event_id, creator, accepted from user_event WHERE user_id = $1',
    [user_id]
  );
  return events.rows;
};

export const eventSorter = (events: any[]) => {
  const sorted_events: SortedEvents = { myEvents: [], invitedEvents: [] };
  events.forEach((row) => {
    if (row.creator === true) {
      sorted_events.myEvents.push(row.event_id);
    } else {
      sorted_events.invitedEvents.push(row.event_id);
    }
  });

  return sorted_events;
};

export const lookupEventFromID = async (eventId: string) => {
  const events = await pool.query('SELECT * from events WHERE event_id = $1', [
    eventId
  ]);
  if (events.rows[0]) {
    return events.rows[0];
  }
};

export const eventsSerializer = async (userID: string, privateKey: string) => {
  const events = await userEventIDLookup(userID);
  const myEvents = await Promise.all(
    events.map(async (eventIDAndCreatorID) => {
      const event = await lookupEventFromID(eventIDAndCreatorID.event_id);
      const creatorSK = await findCreatorSecretKey(event.creator_id);
      if (creatorSK === privateKey) {
        const decryptedEvent = decryptEvent(event.encrypted_event, creatorSK);
        return encryptEvent(decryptedEvent, privateKey);
      }
    })
  );

  const invitedEvents = await Promise.all(
    events.map(async (eventIDAndCreatorID) => {
      const event = await lookupEventFromID(eventIDAndCreatorID.event_id);
      const creatorSK = await findCreatorSecretKey(event.creator_id);
      if (creatorSK !== privateKey && eventIDAndCreatorID.accepted) {
        const decryptedEvent = decryptEvent(event.encrypted_event, creatorSK);
        return {
          encryptedEvent: encryptEvent(decryptedEvent, privateKey),
          accepted: true,
          eventId: eventIDAndCreatorID.event_id
        };
      }
      if (creatorSK !== privateKey && !eventIDAndCreatorID.accepted) {
        const decryptedEvent = decryptEvent(event.encrypted_event, creatorSK);
        return {
          encryptedEvent: encryptEvent(decryptedEvent, privateKey),
          accepted: false,
          eventId: eventIDAndCreatorID.event_id
        };
      }
    })
  );
  const filteredMyEvents = myEvents.filter(function (myEvent) {
    if (myEvent !== undefined) {
      return myEvent;
    }
  });
  const filteredInEvents = invitedEvents.filter(function (inEvent) {
    if (inEvent !== undefined) {
      return inEvent;
    }
  });
  const sessionEvents = {
    myEvents: filteredMyEvents,
    invitedEvents: filteredInEvents
  };
  return sessionEvents;
};
