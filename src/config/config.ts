import { config as dotenv } from 'dotenv';
dotenv();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.PORT || 1337;
const SECRET = process.env.JWTSECRET || 'defaultSecret';
const SERVER_NAMESPACE = process.env.SERVERNAME || 'Server';

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT
};

const config = {
  server: SERVER
};

export default config;
export { SECRET, SERVER_NAMESPACE };
