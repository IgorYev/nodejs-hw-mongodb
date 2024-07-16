import express from 'express';
import { register, login, refreshSession, logout, sendResetEmail, resetPassword } from '../controllers/auth.js';
import validateBody from '../middlewares/validateBody.js';
import { emailSchema } from '../validation/email-schema.js';
import { resetPasswordSchema } from '../validation/reset-password-schema.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshSession);
router.post('/logout', logout);
router.post('/send-reset-email', validateBody(emailSchema), sendResetEmail);
router.post('/reset-pwd', validateBody(resetPasswordSchema), resetPassword);

export default router;