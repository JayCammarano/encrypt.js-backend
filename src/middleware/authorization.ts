import { Request, Response, NextFunction } from 'express';
import {verifyJWT } from "../models/jwt"

export const authorizer = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('token');
  if (!token) {
    return res.status(403).json('Not Authorized');
  }
  try {
    const payload: Object = verifyJWT(token)
    if (payload) {
      req.user = payload;
    }
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json('Not Authorized');
  }
};
