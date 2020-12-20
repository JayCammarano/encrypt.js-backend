import { keyGen, decrypt, encrypt } from '../../encryption/secretBox';
it('generates a secretkey', async () => {
  const key = keyGen();
  expect(key).toHaveLength(44);
});

it('encrypts the event object', () => {
  const event = { title: 'Yes', description: 'ohmg', location: 'yes, Yes' };
  const key = keyGen();
  expect(encrypt(event, key)).toBeDefined;
});

it('decrypts the encoded event', () => {
  const event = { title: 'Yes', description: 'ohmg', location: 'yes, Yes' };
  const key = keyGen();
  const encryptedEvent = encrypt(event, key);
  expect(decrypt(encryptedEvent, key)).toStrictEqual(event);
});
