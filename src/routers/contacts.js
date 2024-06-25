import { Router } from 'express';

import {
  getAllContactsController,
  getContactByIdController,
} from '../controllers/contacts.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';

import isValidId from '../middlewares/isValidId.js';

const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouter.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);

export default contactsRouter;
