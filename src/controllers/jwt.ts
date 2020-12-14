import { Request, Response } from 'express';
import { generateJWT, validateJWT, decodeJWT } from '../models/jwt';
import { key, alg } from '../config/config';

const genJWT = (req: Request, res: Response) => {
  return res.status(200).json(generateJWT(req.body.claims, key, alg));
};

const valJWT = (req: Request, res: Response) => {
  return res.status(200).json(validateJWT(req.body.token, key, alg));
};
const decJWT = (req: Request, res: Response) => {
  return res.status(200).json(decodeJWT(req.body.token));
};

export default { genJWT, valJWT, decJWT };
