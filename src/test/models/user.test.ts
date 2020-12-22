import User from '../../db/user.model';
import { createUser, findUser } from '../../models/user';
it('creates a user table', () => {
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
  expect(await findUser('testtest')).toStrictEqual({ user: { username: user.username, password: user.password, private_key: user.private_key } });
});

it('returns error', async () => {
  expect(await findUser('notrealuser')).toBe('Error: User not found');
});
