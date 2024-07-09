import createHttpError from 'http-errors';
import { Session } from '../db/models/Session.js';
import { User } from '../db/models/User.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createHttpError(401, 'No access token provided');
    }

    const token = authHeader.split(' ')[1];

    const session = await Session.findOne({ accessToken: token });

    if (!session) {
      throw createHttpError(401, 'Unauthorized');
    }

    if (session.accessTokenValidUntil < new Date()) {
      throw createHttpError(401, 'Access token expired');
    }

    const user = await User.findById(session.userId);

    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};