import { insertEvent, findCreator, addUsersToEvent } from "../../models/events";
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

it("adds relations of users and events", async () => {
  const invitees = ["test2", "test1", "test3"]
  const event_id = await insertEvent(encryptedEvent)
  const creator = await findCreator(token)

  invitees.forEach(async (user) => { await insertUser(user, "test2", "secretKeyTest"); });

  await addUsersToEvent(invitees, event_id, creator.user_id)
  const finalCount = (await pool.query('SELECT * from user_event WHERE event_id = $1', [event_id])).rows.length
  expect(finalCount).toBe(3)
})
