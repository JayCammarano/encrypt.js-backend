import { Router, Request, Response } from 'express';
import { authorizer } from '../middleware/authorization';
import newEvent from "../controllers/events"
const router = Router();

router.post('/new', authorizer, async (req: Request, res: Response) => {
  try {
    newEvent(req, res)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export { router };
