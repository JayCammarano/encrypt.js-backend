import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
const getTest = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: 'jwt roolz'
  });
};
const postTest = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: 'Post created'
  });
};

const login = (req: Request, res: Response, next: NextFunction) => {
  // TO-DO Create and Connect DB
  const user = {
    id: 1,
    username: 'brad',
    email: 'brad@gmail.com'
  };

  jwt.sign({ user }, 'secretkey', (_err: any, token: any) => {
    res.json({
      token
    });
  });
};

export default { getTest, postTest, login };
