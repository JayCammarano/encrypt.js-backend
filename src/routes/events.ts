import { Request, Response, Router } from 'express';
import newEvent from "../controllers/events";
import { authorizer } from '../middleware/authorization';
const router = Router();

router.post('/new', authorizer, async (req: Request, res: Response) => {
  try {
    newEvent(req, res)
    res.status(200).json('Success');
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

export { router };
