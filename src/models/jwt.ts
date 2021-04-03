import jwt, { verify } from 'jsonwebtoken';
import { SECRET } from '../config/config';

export const genJWT = (username: string) => {
  const payload = {
    user: username
  };
  return jwt.sign(payload, SECRET, { expiresIn: '1hr' });
};

export const verifyJWT = (token: string) => {
  return verify(token, SECRET);
};
