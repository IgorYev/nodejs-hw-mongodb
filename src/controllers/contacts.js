import createHttpError from 'http-errors';

import { getContacts, getContactById } from '../services/services.js';

export const getAllContactsController = async (req, res) => {
  const data = await getContacts();

  res.json({
    status: 200,
    data,
    message: 'Success found movies',
  });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;

  const data = await getContactById(id);

  if (!data) {
    throw createHttpError(404, `Movie with id=${id} not found`);
  }

  res.json({
    status: 200,
    data,
    message: `Contact with id=${id} find success`,
  });
};
