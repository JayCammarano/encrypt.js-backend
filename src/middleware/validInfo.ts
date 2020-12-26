import { Request, Response, NextFunction } from 'express';
export const validInfo = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  const validUsername = (username: string) => {
    return /^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(username);
  };
  const validPassword = (password: string) => {
    return /^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(password);
  };

  if (req.path === '/register') {
    if (![username, password].every(Boolean)) {
      return res.status(401).json('Missing Credentials');
    } else if (!validUsername(username)) {
      return res.status(401).json('Invalid username');
    } else if (!validPassword) {
      return res.status(401).json('Invalid password');
    }
  } else if (req.path === '/signin') {
    if (![username, password].every(Boolean)) {
      return res.status(401).json('Missing Credentials');
    } else if (!validUsername(username)) {
      return res.status(401).json('Invalid username');
    } else if (!validPassword) {
      return res.status(401).json('Invalid password');
    }
  }

  next();
};
