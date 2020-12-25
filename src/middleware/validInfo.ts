import { Request, Response, NextFunction } from 'express';
export const validInfo = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  function validUsername(username: string) {
    return /^\w+([\.-]?\w+)\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username);
  }

  if (req.path === '/register') {
    if (![username, password].every(Boolean)) {
      return res.status(401).json('Missing Credentials');
    } else if (!validUsername(username)) {
      return res.status(401).json('Invalid username');
    }
  } else if (req.path === '/signin') {
    if (![username, password].every(Boolean)) {
      return res.status(401).json('Missing Credentials');
    } else if (!validUsername(username)) {
      return res.status(401).json('Invalid username');
    }
  }

  next();
};
