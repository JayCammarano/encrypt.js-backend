import { Router, Request, Response } from 'express';
import userEvents from "../controllers/dashboard"

import { authorizer } from '../middleware/authorization';
const router = Router();

router.get('/dashboard', authorizer, async (req: Request, res: Response) => {
  try {    
    userEvents(req, res)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export { router };
