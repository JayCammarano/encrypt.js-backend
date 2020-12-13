import express from 'express';
import controller from '../controllers/jwt';
import verifyToken from '../models/jwt';

const router = express.Router();

const getTest = router.get('/getTest', controller.getTest);
const postTest = router.post('/postTest', controller.postTest);
const login = router.post('/login', verifyToken(req, res, next), controller.login);

export { getTest, postTest, login };
