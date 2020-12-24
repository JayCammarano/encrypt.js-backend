import { Response } from 'express';

const serverHealthCheck = (res: Response) => {
  return res.status(200).json({
    message: 'pong'
  });
};

export default { serverHealthCheck };
