import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET } from '../config/config';

export const authorizer = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('token');
  if (!token) {
    return res.status(403).json('Not Authorized');
  }
  try {
    const payload: Object = verify(token, SECRET);
    console.log(payload);
    if (payload) {
      req.auth = true;
    }
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json('Not Authorized');
  }
};
