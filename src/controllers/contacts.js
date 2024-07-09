import createHttpError from 'http-errors';
import {
  getContacts,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById,
} from '../services/services.js';

export const getAllContactsController = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const sortBy = req.query.sortBy || 'name';
  const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

  try {
    const { contacts, totalItems } = await getContacts(page, perPage, sortBy, sortOrder, req.user._id);
    const totalPages = Math.ceil(totalItems / perPage);

    res.json({
      status: 200,
      message: 'Successfully found contacts',
      data: {
        data: contacts,
        page: page,
        perPage: perPage,
        totalItems: totalItems,
        totalPages: totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const data = await getContactById(contactId, req.user._id);

    if (!data) {
      return next(
        createHttpError(404, {
          status: 404,
          message: `Contact with id=${contactId} not found`,
          data: { message: 'Contact not found' },
        }),
      );
    }

    res.json({
      status: 200,
      data,
      message: `Contact with id=${contactId} found successfully`,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  try {
    const newContact = await addContact({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
      userId: req.user._id,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  const updatedContact = await updateContactById(contactId, req.user._id, {
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
  });

  if (!updatedContact) {
    throw createHttpError(404, `Contact with id=${contactId} not found`);
  }

  res.json({
    status: 200,
    data: updatedContact,
    message: 'Successfully patched a contact!',
  });
};

export const deleteContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const deletedContact = await deleteContactById(contactId, req.user._id);

  if (!deletedContact) {
    return next(createHttpError(404, `Contact with id=${contactId} not found`));
  }

  res.status(204).send();
};