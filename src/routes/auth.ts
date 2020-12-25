import { Router } from 'express';
import { signUp, signIn } from '../controllers/auth';
import { validInfo } from '../middleware/validInfo';
const authRouter = Router();

authRouter.post('/register', validInfo, signUp);
authRouter.post('/signin', validInfo, signIn);

export default authRouter;
