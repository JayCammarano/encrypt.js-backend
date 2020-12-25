import { Router } from 'express';
import { signUp, signIn } from '../controllers/auth';
const authRouter = Router();

authRouter.post('/register', signUp);
authRouter.post('/signin', signIn);

export default authRouter;
