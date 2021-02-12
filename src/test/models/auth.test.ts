import { userExists, bcryptPassword, insertUser, getUser, bcryptCompare } from '../../models/auth';
import { setup, teardown } from "../setupTeardown"

const username = 'Testestestestest';
const password = 'testestestestsetsetestsetsetsetsetet';
const secretKey = 'secretKeyTest';

beforeAll(() => { setup })
afterAll(() => { teardown })

it('checks if user exists', async () => {
  const user = 'username';
  expect(await userExists(user)).toBe(false);
});

it('Hashes a password with bcrypt', async () => {
  expect((await bcryptPassword(password)).length).toBe(60);
});

it('creates a user in the database', async () => {
  const user = await insertUser(username, password, secretKey);
  expect(user.user_name).toBe('Testestestestest');
});

it('gets the user if they exist', async () => {
  const user = await getUser(username);
  expect(user.user_name).toStrictEqual('Testestestestest');
});

it('compares bcrypt passwords to req password', async () => {
  const dbPassword = await bcryptPassword(password);
  expect(await bcryptCompare(dbPassword, password)).toBe(true);
});
