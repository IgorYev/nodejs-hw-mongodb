import { User } from '../db/models/User.js';

export const registerUser = async ({ name, email, password }) => {
  const user = new User({ name, email, password });
  await user.save();
  return user;
};