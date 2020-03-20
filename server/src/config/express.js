require('dotenv').config({ path: `${__dirname}/../.env` });
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes';

const app = express();

app.set('enviroment', process.env.ENV);
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

export default app;
