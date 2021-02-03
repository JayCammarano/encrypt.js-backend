import { Router, Request, Response } from 'express';
import { authorizer } from '../middleware/authorization';

const router = Router();

router.get('/new', authorizer, async (req: Request, res: Response) => {
  try {
      req
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export { router };
