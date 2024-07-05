import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '../db/models/User.js';
import { registerUser } from '../services/auth.js';

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