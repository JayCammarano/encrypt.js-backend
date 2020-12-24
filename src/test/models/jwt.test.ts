import { genJWT } from '../../models/jwt';

it('Returns a token with the username', () => {
  expect(genJWT('testuuid').length).toBe(152);
});
