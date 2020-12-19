import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const key = process.env.TOKEN_KEY || 'TO-DO Encryted Key Here';
const alg = process.env.ALGORITHM || 'HS512';

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT
};

const config = {
  server: SERVER
};

export default config;
export { key, alg };
