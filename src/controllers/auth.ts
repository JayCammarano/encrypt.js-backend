import { Request, Response } from 'express';
import { genJWT } from '../models/jwt';
import { keyGen } from '../encryption/secretBox';
import { userExists, bcryptPassword, insertUser, getUser, bcryptCompare } from '../models/auth';

export const signUp = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const secretKey = keyGen();
  const userCheck = await userExists(username);
  if (userCheck == false) {
    const hashWord = await bcryptPassword(password);

    const addedUser = await insertUser(username, hashWord, secretKey);
    const token = genJWT(addedUser.user_name);
    return res.status(200).send({ token });
  } else {
    return res.status(401).send('User already exists');
  }
};
export const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await userExists(username);
  if (!user) {
    return res.status(401).send('Password or Username is invalid');
  } else {
    const userObject = await getUser(username);

    const validPassword = await bcryptCompare(userObject.user_password, password);
    if (!validPassword) {
      return res.status(401).send('Password or Username is invalid');
    }
    const token = genJWT(userObject.user_name);
    res.json({
      user: {
        username: userObject.user_name,
        secretKey: userObject.secret_key
      },
      token
    });
  }
};
