import { Router } from 'express';
import { upload } from '../middlewares/multer.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import isValidId from '../middlewares/isValidId.js';
import validateBody from '../middlewares/validateBody.js';
import { contactSchema, updateContactSchema } from '../validation/contacts-schemas.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactByIdController,
} from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

contactsRouter.post(
  '/',
  upload.single('photo'),
  validateBody(contactSchema),
  ctrlWrapper(createContactController)
);

contactsRouter.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController)
);

contactsRouter.delete('/:contactId', isValidId, ctrlWrapper(deleteContactByIdController));

export default contactsRouter;