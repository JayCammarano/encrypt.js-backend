import express from 'express';
import controller from '../controllers/jwt';

const router = express.Router();
const gen = router.post('/gen', controller.genJWT);
const val = router.post('/val', controller.valJWT);
const dec = router.post('/decode', controller.decJWT);

export { gen, val, dec };
