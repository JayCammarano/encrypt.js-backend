import { Router } from 'express';
import { signUp, signIn } from '../controllers/auth';
const router = Router();

router.post('/register', signUp);
router.post('/signin', signIn);

export default router;
