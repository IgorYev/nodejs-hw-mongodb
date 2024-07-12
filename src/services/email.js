import nodemailer from 'nodemailer';
import env from '../utils/env.js';
import createHttpError from 'http-errors';

const SMTP_HOST = env('SMTP_HOST');
const SMTP_PORT = env('SMTP_PORT');
const SMTP_USER = env('SMTP_USER');
const SMTP_PASSWORD = env('SMTP_PASSWORD');
const SMTP_FROM = env('SMTP_FROM');

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

export const sendResetPasswordEmail = async (to, link) => {
  const mailOptions = {
    from: SMTP_FROM,
    to,
    subject: 'Reset Password',
    text: `Click the link to reset your password: ${link}`,
    html: `<p>Click the link to reset your password: <a href="${link}">Reset Password</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw createHttpError(500, 'Failed to send the email, please try again later.');
  }
};