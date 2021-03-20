import { Request, Response, Router } from 'express';
import { signIn, signUp } from '../controllers/auth';
import { authorizer } from '../middleware/authorization';
import { validInfo } from '../middleware/validInfo';
const router = Router();

router.post('/register', validInfo, signUp);
router.post('/signin', validInfo, signIn);
router.get('/is_verify', authorizer, async (_req: Request, res: Response) => {
  // Route to verify if a token is valid
  // for when people refresh the page to not get logged out
  try {
    // Error: res.json not a function
    // Pry bc res is getting passed through the authorizer
    // and is not a type Response anymore???
    res.json(true);
  } catch (err) {
    console.error(err.message);
  }
});
export { router };
