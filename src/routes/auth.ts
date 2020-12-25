import { Router, Response } from 'express';
import { signUp, signIn } from '../controllers/auth';
import { validInfo } from '../middleware/validInfo';
import { authorizer } from '../middleware/authorization';
const router = Router();

router.post('/register', validInfo, signUp);
router.post('/signin', validInfo, signIn);
router.get('/is_verify', authorizer, async (res: Response) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
export { router };
