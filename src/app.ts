import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

import 'reflect-metadata';

import routes from './routes';
import './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

dotenv.config();

export default app;
