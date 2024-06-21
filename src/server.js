import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { Contact } from './db/models/Contact.js';

const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(pino());
  app.use(express.json());

  app.get('/contacts', async (req, res) => {
    try {
      const result = await Contact.find();
      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: result,
      });
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    try {
      const contact = await Contact.findById(contactId);
      if (contact) {
        res.json({
          status: 200,
          message: `Successfully found contact with id ${contactId}!`,
          data: contact,
        });
      } else {
        res.status(404).json({ message: 'Contact not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
    }
  });

  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
