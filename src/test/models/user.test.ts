import User from '../../db/user.model';
import { createUser } from '../../models/user';
it('creates a new user table', () => {
  expect(User).toBeInstanceOf(Object);
});

it('creates a new user', async () => {
  const initCount = User.count();
  createUser('newUserTest', 'password');
  const newCount = User.count();

  expect(newCount).toBe((await initCount) + 1);
});
