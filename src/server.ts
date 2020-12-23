import http from 'http';
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import logging from './config/logging';
import config from './config/config';
import sampleRoutes from './routes/sample';
import { gen, val, dec } from './routes/jwt';
const NAMESPACE = 'Server';
const router = express();

/** Log the request */
router.use((req, res, next) => {
  logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`, NAMESPACE);

  next();
});

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Rules of our API */
router.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

/** Routes go here */
router.use('/api/sample', sampleRoutes);
router.use('/api/jwt', gen);
router.use('/api/jwt', val);
router.use('/api/jwt', dec);

/** Error handling */
router.use((res: Response) => {
  const error = new Error('Not found');

  res.status(404).json({
    message: error.message
  });
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
