import { Contact } from '../db/models/Contact.js';

export const getContacts = async (page, perPage, sortBy, sortOrder) => {
  const skip = (page - 1) * perPage;
  const contacts = await Contact.find()
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(perPage);
  const totalItems = await Contact.countDocuments();
  
  return { contacts, totalItems };
};

export const getContactById = (id) => Contact.findById(id);

export const addContact = async ({
  name,
  phoneNumber,
  email,
  isFavourite,
  contactType,
}) => {
  const newContact = new Contact({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
  });

  await newContact.save();
  return newContact;
};

export const updateContactById = async (
  id,
  { name, phoneNumber, email, isFavourite, contactType },
) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { name, phoneNumber, email, isFavourite, contactType },
    { new: true },
  );
  return updatedContact;
};

export const deleteContactById = async (id) => {
  const deletedContact = await Contact.findByIdAndDelete(id);
  return deletedContact;
};