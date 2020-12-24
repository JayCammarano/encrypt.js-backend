import { Router } from 'express';
import { signUP } from '../controllers/auth';
const router = Router();

router.post('/register', signUp);

export default router;
