import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { Contact } from './db/models/Contact.js';

const setupServer = () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(pino());
  app.use(express.json());

  app.get('/api/contacts', async (req, res) => {
    try {
      const result = await Contact.find();
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
    }
  });

  // Обробка неіснуючих роутів
  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Вибір порту з змінної оточення або за замовчуванням 3000
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
