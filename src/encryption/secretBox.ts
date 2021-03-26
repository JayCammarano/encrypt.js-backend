import { decode as decodeBase64, encode as encodeBase64 } from '@stablelib/base64';
import { decode as decodeUTF8, encode as encodeUTF8 } from '@stablelib/utf8';
import { randomBytes } from 'crypto';
import { box_keyPair, secretbox, SecretBoxLength, secretbox_open } from 'tweetnacl-ts';

export const keyGen = () => {
  const key = box_keyPair().secretKey;
  const keyBase64 = encodeBase64(key);
  return keyBase64;
};

export const encrypt = (event: Object, sessionPrivateKey: string) => {
  const nonce = randomBytes(SecretBoxLength.Nonce);
  const eventString = encodeUTF8(JSON.stringify(event));
  const skString = decodeBase64(sessionPrivateKey);

  const encryptedEvent = secretbox(eventString, nonce, skString);
  const fullMessage = new Uint8Array(SecretBoxLength.Nonce + encryptedEvent.length);
  fullMessage.set(nonce);
  fullMessage.set(encryptedEvent, SecretBoxLength.Nonce);

  const base64FullMessage = encodeBase64(fullMessage);
  return base64FullMessage;
};

export const decrypt = (eventWithNonce: string, creatorPrivateKey: string) => {
  const keyUint8Array = decodeBase64(creatorPrivateKey);
  const eventWithNonceAsUint8Array = decodeBase64(eventWithNonce);
  const nonce = eventWithNonceAsUint8Array.slice(0, SecretBoxLength.Nonce);
  const event = eventWithNonceAsUint8Array.slice(SecretBoxLength.Nonce, eventWithNonce.length);
  const decrypted = secretbox_open(event, nonce, keyUint8Array);

  if (!decrypted) {
    throw new Error('Could not decrypt message');
  }

  const base64DecryptedMessage = decodeUTF8(decrypted);
  return JSON.parse(base64DecryptedMessage);
};
