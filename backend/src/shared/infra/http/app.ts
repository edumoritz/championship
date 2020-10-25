import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes';

import AppError from '@shared/errors/AppError';
import createConnection from '@shared/infra/typeorm';
import '@shared/container';
// import '@shared/infra/typeorm';

createConnection();

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);


app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
