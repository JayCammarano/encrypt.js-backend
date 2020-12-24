import { userExists, bcryptPassword, insertUser } from '../../models/auth';

it('checks if user exists', async () => {
  const user = 'username';
  expect(await userExists(user)).toBe('Carry on');
});

it('Hashes a password with bcrypt', async () => {
  const password = 'TestTest';
  expect((await bcryptPassword(password)).length).toBe(60);
});

it('creates a user in the database', async () => {
  const username = 'Testestestestest';
  const password = 'testestestestsetsetestsetsetsetsetet';
  const secretKey = 'secretKeyTest';
  expect(await insertUser(username, password, secretKey)).toBe('Testestestestest');
});
