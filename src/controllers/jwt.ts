import { NextFunction, Request, Response } from 'express';
import { generateJWT, validateJWT, decodeJWT } from '../models/jwt';
import { key, alg } from '../config/config';

const genJWT = (req: Request, res: Response, next: NextFunction) => {
  return res.json(generateJWT(res, key, alg));
};

const valJWT = (req: Request, res: Response, next: NextFunction) => {
  return res.json(validateJWT(req.body.token, key, alg));
};
const decJWT = (req: Request, res: Response, next: NextFunction) => {
  return res.json(decodeJWT(req.body.token));
};

export default { genJWT, valJWT, decJWT };
