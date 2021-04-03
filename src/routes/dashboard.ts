import { Request, Response, Router } from 'express';
import userEvents from '../controllers/dashboard';
import { authorizer } from '../middleware/authorization';

const router = Router();

router.get('/dashboard', authorizer, async (req: Request, res: Response) => {
  try {
    userEvents(req, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

export { router };
