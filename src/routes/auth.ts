import { Router } from 'express';
import { signIn } from '../controllers/auth';
const router = Router();

router.post('/register', signIn);

export default router;
