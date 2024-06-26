import dotenv from 'dotenv';

dotenv.config();

const env = (key, defaultValue = undefined) => {
  return process.env[key] || defaultValue;
};

export default env;
