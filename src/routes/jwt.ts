import express from 'express';
import controller from '../controllers/jwt';

const router = express.Router();
router.post('/gen', controller.genJWT);
router.post('/val', controller.valJWT);
router.post('/decode', controller.decJWT);

export = router;
