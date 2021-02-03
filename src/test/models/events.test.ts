// import {insertEvent} from "../../models/events"
import { insertEvent, findCreator } from "../../models/events";
import {genJWT} from "../../models/jwt"
const token = genJWT('test')
const request = {encryptedEvent: "jH7L0tLCCrOluC5uKymDKHRRquK0GKtphWYODouf0KxeyXg98krGqrZ7AWAaOsC4eeM8"}
it('adds a new event to the db', async () => {
  const event_id = await insertEvent(request.encryptedEvent)
  expect(event_id.length).toBe(36);
});

it("returns the creator user object", async () => {
  const creator = await findCreator(token)
  expect(creator.user_name).toBe("test")
})