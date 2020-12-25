import express, { json, Response, Request, NextFunction } from 'express';
import cors from 'cors';
import logging from './config/logging';
import config, { SERVER_NAMESPACE } from './config/config';

import authRouter from './routes/auth';

const app = express();
/** Log the request */
app.use((req: Request, res: Response, next: NextFunction) => {
  logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`, SERVER_NAMESPACE);

  next();
});

/** Middleware */
app.use(cors);
app.use(json());

/** Routes go here */

app.use('/auth', authRouter);
/** Error handling */
app.use((res: Response) => {
  const error = new Error('Not found');

  res.status(404).json({
    message: error.message
  });
});

// const httpServer = http.createServer(app);

// httpServer.listen(() => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
app.listen(config.server.port, () => {
  logging.info(SERVER_NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`);
});
