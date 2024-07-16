import path from 'node:path';

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;


export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  CLOUD_API_KEY: 'CLOUD_API_KEY',
  CLOUD_API_SECRET: 'CLOUD_API_SECRET',
};