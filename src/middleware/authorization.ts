import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET } from '../config/config';

export const authorizer = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('jwt_token');
  if (!token) {
    return res.status(403).json('Not Authorized');
  }
  try {
    const payload = verify(token, SECRET);
    req.user = payload.user;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json('Not Authorized');
  }
};
