import User from '../../db/user.model';
import { createUser, findUser } from '../../models/user';
it('creates a new user table', () => {
  expect(User).toBeInstanceOf(Object);
});

it('creates a new user', async () => {
  const initCount = await User.count();
  createUser('newUserTest', 'password');
  const newCount = await User.count();

  expect(newCount).toBe(initCount + 1);
});

it('returns the user (and eventually events)', async () => {
  const user = await User.create({
    username: 'testtest',
    password: 'testtesttest',
    private_key: 'testtesttesttest'
  });
  expect(await findUser('testtest')).toBe(user);
});

it('returns the user (and eventually events)', async () => {
  expect(await findUser('testtest')).toBe('error');
});
