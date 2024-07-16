import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../db/models/User.js';
import { registerUser, loginUser, refreshUserSession, logoutUser, invalidateUserSessions } from '../services/auth.js';
import { sendResetPasswordEmail } from '../services/email.js';
import { ONE_DAY } from '../constants/index.js';
import env from '../utils/env.js';

const JWT_SECRET = env('JWT_SECRET');
const APP_DOMAIN = env('APP_DOMAIN');

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw createHttpError(400, 'Name, email, and password are required');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createHttpError(409, 'Email in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await registerUser({ name, email, password: hashedPassword });

    res.status(201).json({
      status: 'success',
      message: 'Successfully registered a user!',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw createHttpError(400, 'Email and password are required');
    }

    const session = await loginUser({ email, password });

    res.cookie('refreshToken', session.refreshToken, { httpOnly: true, secure: true, maxAge: ONE_DAY });
    res.status(200).json({
      status: 'success',
      message: 'Successfully logged in a user!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const refreshSession = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw createHttpError(400, 'Refresh token is required');
    }

    const session = await refreshUserSession(refreshToken);

    res.cookie('refreshToken', session.refreshToken, { httpOnly: true, secure: true, maxAge: ONE_DAY });
    res.status(200).json({
      status: 'success',
      message: 'Successfully refreshed a session!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw createHttpError(400, 'Refresh token is required');
    }

    await logoutUser(refreshToken);

    res.clearCookie('refreshToken', { httpOnly: true, secure: true });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const sendResetEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(404, 'User not found!');
    }

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '5m' });

    const resetLink = `${APP_DOMAIN}/reset-pwd?token=${token}`;
    
    await sendResetPasswordEmail(email, resetLink);

    res.status(200).json({
      status: 200,
      message: 'Reset password email has been successfully sent.',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { email } = decoded;

    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(404, 'User not found!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    await invalidateUserSessions(user._id);

    res.status(200).json({
      status: 200,
      message: "Password has been successfully reset.",
      data: {}
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
      next(createHttpError(401, 'Token is expired or invalid.'));
    } else {
      next(error);
    }
  }
};