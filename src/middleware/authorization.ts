import { NextFunction, Request, Response } from 'express';
import { verifyJWT } from "../models/jwt";

export const authorizer = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('token');
  if (!token) {
    res.status(403).send('Not Authorized');
    return false
  }
  try {
    const payload: Object = verifyJWT(token)
    if (payload) {
      req.user = payload;
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(403).send('Not Authorized');
    next()
  }
};
