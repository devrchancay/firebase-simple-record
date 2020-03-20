require('dotenv').config({ path: `${__dirname}/.env` });
import http from 'http';
import app from './config/express';
import logger from './config/logger';
import { connectDb } from './models';

const log = logger();
const isProduction = process.env.NODE_ENV === 'production';
const server = http.createServer(app);
const port = process.env.PORT || 8000;

connectDb().then(async () => {
  server.listen({ port }, () => {
    if (!isProduction) {
      log.info(`Server on http://localhost:${port}`);
    }
  });
});
