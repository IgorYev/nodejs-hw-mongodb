import { Contact } from '../db/models/Contact.js';

export const getContacts = () => Contact.find();

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

// export const upsertMovie = async (filter, data, options = {}) => {
//   const result = await Contact.findOneAndUpdate(filter, data, {
//     new: true,
//     includeResultMetadata: true,
//     ...options,
//   });

//   if (!result || !result.value) return null;

// const isNew = data && data.lastErrorObject && data.lastErrorObject.upserted;
//   const isNew = Boolean(result?.lastErrorObject?.upserted);

//   return {
//     data: result.value,
//     isNew,
//   };
// };

// export const deleteMovie = (filter) => Contact.findOneAndDelete(filter);
