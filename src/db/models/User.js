import { Schema, model } from 'mongoose';
import { emailRegexp } from '../../constants/user-constants.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [emailRegexp, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = model('User', userSchema);