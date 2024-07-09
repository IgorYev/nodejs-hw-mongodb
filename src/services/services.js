import { Contact } from '../db/models/Contact.js';

export const getContacts = async (page, perPage, sortBy, sortOrder, userId) => {
  const contacts = await Contact.find({ userId })
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * perPage)
    .limit(perPage);
  const totalItems = await Contact.countDocuments({ userId });
  return { contacts, totalItems };
};

export const getContactById = async (id, userId) => {
  return await Contact.findOne({ _id: id, userId });
};

export const addContact = async (contactData) => {
  const contact = new Contact(contactData);
  await contact.save();
  return contact;
};

export const updateContactById = async (id, userId, updateData) => {
  return await Contact.findOneAndUpdate({ _id: id, userId }, updateData, { new: true });
};

export const deleteContactById = async (id, userId) => {
  return await Contact.findOneAndDelete({ _id: id, userId });
};