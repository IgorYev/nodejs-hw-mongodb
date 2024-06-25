import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import contactsRouter from './routers/contacts.js';

import notFoundHanler from './middlewares/NotFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';

import env from './utils/env.js';

const port = env('PORT', '3000');

const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(pino());
  app.use(express.json());

  app.use('/api', contactsRouter);
  app.use(notFoundHanler);
  app.use(errorHandler);

  // app.get('/contacts', async (req, res) => {
  //   try {
  //     const result = await Contact.find();
  //     res.status(200).json({
  //       status: res.statusCode,
  //       message: 'Successfully found contacts!',
  //       data: result,
  //     });
  //   } catch (err) {
  //     res.status(500).json({ status: res.statusCode, message: 'Server Error' });
  //   }
  // });

  // app.get('/contacts/:contactId', async (req, res) => {
  //   const { contactId } = req.params;
  //   try {
  //     const contact = await Contact.findById(contactId);
  //     if (contact) {
  //       res.status(200).json({
  //         status: res.statusCode,
  //         message: `Successfully found contact with id ${contactId}!`,
  //         data: contact,
  //       });
  //     } else {
  //       res
  //         .status(404)
  //         .json({ status: res.statusCode, message: 'Contact not found' });
  //     }
  //   } catch (err) {
  //     res.status(500).json({ status: res.statusCode, message: 'Server Error' });
  //   }
  // });

  // app.use((req, res, next) => {
  //   res.status(404).json({ status: res.statusCode, message: 'Not found' });
  // });

  // const PORT = process.env.PORT || 3000;

  //   app.listen(PORT, () => {
  //     console.log(`Server is running on port ${PORT}`);
  //   });
  // };

  app.listen(port, () => console.log(`Server running on ${port} PORT`));
};

export default setupServer;
