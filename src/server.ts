import express, { json, Response, Request, NextFunction } from 'express';
import logging from './config/logging';
import config, { SERVER_NAMESPACE } from './config/config';

import { router as authRouter } from './routes/auth';
import { router as dashRouter } from './routes/dashboard';

const app = express();
/** Log the request */
app.use((req: Request, res: Response, next: NextFunction) => {
  logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`, SERVER_NAMESPACE);

  next();
});

/** Middleware */
app.use(json());

/** Routes go here */

app.use('/auth', authRouter);
app.use('/dashboard', dashRouter);
/** Error handling */
app.use((res: Response) => {
  return res.status(404).json('Not Found');
});

// const httpServer = http.createServer(app);

// httpServer.listen(() => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
app.listen(config.server.port, () => {
  logging.info(SERVER_NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`);
});
