import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import env from './utils/env.js';
import cookieParser from 'cookie-parser';

import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';

import notFoundHandler from './middlewares/NotFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import swaggerDocs from './middlewares/swaggerDocs.js';

const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(pino());
  app.use(express.json());
  app.use(cookieParser());
  app.use('/api-docs', swaggerDocs());

  
  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = env('PORT', '3000');

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;