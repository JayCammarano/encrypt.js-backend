import { createUserTable } from '../../models/user';
it('creates a new user table', () => {
  expect(createUserTable).toBeInstanceOf(Object);
});
