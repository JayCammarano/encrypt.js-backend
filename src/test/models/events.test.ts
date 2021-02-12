import { insertEvent, findCreator, addUsersToEvent, userEventLookup, eventSorter, eventsSerializer} from "../../models/events";
import { insertUser } from '../../models/auth';
import { setup, teardown } from "../setupTeardown"
import { genJWT } from "../../models/jwt"
import {pool} from "../../db/db"
const token = genJWT('test')
const encryptedEvent = "jH7L0tLCCrOluC5uKymDKHRRquK0GKtphWYODouf0KxeyXg98krGqrZ7AWAaOsC4eeM8"


beforeAll(() => { setup })
afterAll(() => { teardown })

it('adds a new event to the db', async () => {
  const event_id = await insertEvent(encryptedEvent)
  expect(event_id.length).toBe(36);
});

it("returns the creator user object", async () => {
  const creator = await findCreator(token)
  expect(creator.user_name).toBe("test")
})

it('looks up events from a user', async () => {
  const creator = await findCreator(token)
  const event_id = await insertEvent(encryptedEvent)
  await addUsersToEvent([creator], event_id, creator.user_id)
  const events = await userEventLookup(creator.user_id)
  expect(events[0].creator).toBe(true);
});

it('sorts events into creator or invitee', async () => {
  const events = [{"creator": true, "event_id": "02001244-0da2-4876-952e-5f42c5e243fd"},
  {"creator": false, "event_id": "02001244-0da2-4876-952e-5f42c5e243fd"}]
  const sortedEevents = eventSorter(events)
  expect(sortedEevents).toStrictEqual({"invitedEvents": ["", "02001244-0da2-4876-952e-5f42c5e243fd"], "myEvents": ["", "02001244-0da2-4876-952e-5f42c5e243fd"]});
});
it('creates two arrays if no events are submitted', async () => {
  const events: any[] = []
  const sortedEevents = eventSorter(events)
  expect(sortedEevents).toStrictEqual({"invitedEvents": [""], "myEvents": [""]});
});

it('returns empty arrays when no events are found', async () => {
  const creator = await insertUser("noEventsUser", "test2", "secretKeyTest");
  const events = await eventsSerializer(creator.user_name)
  expect(events).toStrictEqual({"invitedEvents": [""], "myEvents": [""]})
});

it("adds relations of users and events", async () => {
  const invitees = ["test2", "test1", "test3"]
  const event_id = await insertEvent(encryptedEvent)
  const creator = await findCreator(token)

  invitees.forEach(async (user) => { await insertUser(user, "test2", "secretKeyTest"); });
  await addUsersToEvent(invitees, event_id, creator.user_id)
  const finalCount = (await pool.query('SELECT * from user_event WHERE event_id = $1', [event_id])).rows.length
  expect(finalCount).toBe(3)
})
