import { Request, Response } from 'express';
import { genJWT } from '../models/jwt';
import { keyGen } from '../encryption/secretBox';
import { userExists, bcryptPassword, insertUser } from '../models/auth';

export const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const secretKey = keyGen();
  const userCheck = await userExists(username);
  if (userCheck == 'Carry on') {
    const hashWord = await bcryptPassword(password);

    const addedUser = await insertUser(username, hashWord, secretKey);
    const token = genJWT(addedUser);
    return token;
  } else {
    return res.status(401).send('User already exists');
  }
};
