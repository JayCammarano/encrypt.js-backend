import jwt from 'jsonwebtoken';
import { SECRET } from '../config/config';
export const genJWT = (user_id: string) => {
  const payload = {
    user: user_id
  };
  return jwt.sign(payload, SECRET, { expiresIn: '1hr' });
};
