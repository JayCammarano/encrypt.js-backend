import { generateJWT, validateJWT, decodeJWT } from '../../models/jwt';
const tClaims = {
  Username: 'test',
  public_key: 'encryptedkey'
};
const tKey = 'testKey';
const tAlgorithm = 'HS512';
const tToken = generateJWT(tClaims, tKey, tAlgorithm);

it('generates a JWT', () => {
  const jwt = generateJWT(tClaims, tKey, tAlgorithm);

  expect(typeof jwt).toBe('string');
});

it('validates the JWT', () => {
  expect(validateJWT(tToken, tKey, tAlgorithm)).toBe(true);
});

it('decodes the JWT', () => {
  const parsedToken = decodeJWT(tToken);

  expect(parsedToken).toEqual({
    header: {
      alg: tAlgorithm,
      typ: 'JWT'
    },
    claim: tClaims
  });
});
