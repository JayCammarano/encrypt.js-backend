import { NextFunction, Request, Response } from 'express';

const verifyToken = (req: Response, res: Response, next: NextFunction) => {
  const bearerHeader = req.get('authorizaton');

  if (typeof bearerHeader !== undefined) {
    const bearer = bearerHeader.split(' ');
    return bearer[1];
  } else {
    return res.sendStatus(403);
  }
};

export default verifyToken;
