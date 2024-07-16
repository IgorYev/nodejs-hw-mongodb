import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      match: /^[0-9+-]+$/,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Contact = model('Contact', contactSchema);