import { Request, Response, Router } from 'express';
import { signIn, signUp } from '../controllers/auth';
import { authorizer } from '../middleware/authorization';
import { validInfo } from '../middleware/validInfo';
const router = Router();

router.post('/register', validInfo, signUp);
router.post('/signin', validInfo, signIn);
router.get('/is_verify', authorizer, async (_req: Request, res: Response) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
  }
});
export { router };
