require('dotenv').config({ path: `${__dirname}/../.env` });
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes';

const app = express();

app.set('enviroment', process.env.ENV);
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(cors());
app.use('/uploads/', express.static('uploads'));
app.use(routes);

export default app;
