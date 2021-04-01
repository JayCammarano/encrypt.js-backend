import { pool } from "../../db/db";
import { keyGen } from "../../encryption/secretBox";
import { insertUser } from '../../models/auth';
import { addUsersToEvent, decryptEvent, encryptEvent, eventSorter, eventsSerializer, findIDFromToken, insertEvent, lookupEventFromID, userEventIDLookup } from "../../models/events";
import { genJWT } from "../../models/jwt";
import { setup, teardown } from "../setupTeardown";

const token = genJWT('test') 
const secretKey = keyGen()
const encryptedEvent = "jH7L0tLCCrOluC5uKymDKHRRquK0GKtphWYODouf0KxeyXg98krGqrZ7AWAaOsC4eeM8"
const plainTextEvent = {
  title: "test",
  event: "test"
}
insertUser("test", "test2", secretKey);

beforeAll(() => { setup })
afterAll(() => { teardown })

it('adds a new event to the db', async () => {
  const creator = await findIDFromToken(token)
  const event_id = await insertEvent(encryptedEvent, creator.user_id)
  expect(event_id.length).toBe(36);
});

it("returns the creator user object", async () => {
  const creator = await findIDFromToken(token)
  expect(creator.user_name).toBe("test")
})

it('looks up events from a user', async () => {
  const creator = await findIDFromToken(token)
  const event_id = await insertEvent(encryptedEvent, creator.user_id)
  await addUsersToEvent([creator], event_id, creator.user_id)
  const events = await userEventIDLookup(creator.user_id)
  expect(events[0].creator).toBe(true);
});

it('sorts events into creator or invitee', async () => {
  const events = [{"creator": true, "event_id": "02001244-0da2-4876-952e-5f42c5e243fd"},
  {"creator": false, "event_id": "02001244-0da2-4876-952e-5f42c5e243fd"}]
  const sortedEevents = eventSorter(events)
  expect(sortedEevents).toStrictEqual({"invitedEvents": ["02001244-0da2-4876-952e-5f42c5e243fd"], "myEvents": ["02001244-0da2-4876-952e-5f42c5e243fd"]});
});

it('creates two arrays if no events are submitted', async () => {
  const events: any[] = []
  const sortedEevents = eventSorter(events)
  expect(sortedEevents).toStrictEqual({"invitedEvents": [], "myEvents": []});
});

it('returns empty arrays when no events are found', async () => {
  const creator = await insertUser("noEventsUser", "test2", "secretKeyTest");
  const events = await eventsSerializer(creator.user_name, secretKey)
  expect(events).toStrictEqual({"invitedEvents": [], "myEvents": []})
});

it('returns the encrypted event string', async () =>{
  const creator = await findIDFromToken(token)
  const encryptedEvent = encryptEvent(plainTextEvent, creator.secret_key)
  expect(encryptedEvent.length).toBe(96)
})

it('returns the decrypted event object', async () =>{
  const creator = await findIDFromToken(token)
  const encryptedEvent = encryptEvent(plainTextEvent, creator.secret_key)
  const eventObject = await decryptEvent(encryptedEvent, creator.secret_key)
  expect(eventObject).toStrictEqual({"event": "test", "title": "test"})

})

it('looks up events from event_id', async () => {
  const event = await lookupEventFromID("d70b1c24-218e-407a-bab2-f01f798d9862")
  expect(event).toStrictEqual({"creator_id": "a1edec9c-e63f-4129-96a0-c16b3ad75300",  "encrypted_event": "jH7L0tLCCrOluC5uKymDKHRRquK0GKtphWYODouf0KxeyXg98krGqrZ7AWAaOsC4eeM8",   "event_id": "d70b1c24-218e-407a-bab2-f01f798d9862"})
})

it("adds relations of users and events", async () => {
  const invitees = ["test2", "test1", "test3"]
  const creator = await findIDFromToken(token)
  const event_id = await insertEvent(encryptedEvent, creator.user_id)

  invitees.forEach(async (user) => { await insertUser(user, "test2", "secretKeyTest"); });
  await addUsersToEvent(invitees, event_id, creator.user_id)
  const finalCount = (await pool.query('SELECT * from user_event WHERE event_id = $1', [event_id])).rows.length
  expect(finalCount).toBe(3)
})
