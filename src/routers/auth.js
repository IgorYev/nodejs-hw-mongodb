// import express from 'express';
// import { register, login, refreshSession, logout } from '../controllers/auth.js';

// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);
// router.post('/refresh', refreshSession);
// router.post('/logout', logout);

// export default router;


import express from 'express';
import { register, login, refreshSession, logout, sendResetEmail } from '../controllers/auth.js';
import validateBody from '../middlewares/validateBody.js';
import { emailSchema } from '../validation/email-schema.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshSession);
router.post('/logout', logout);
router.post('/send-reset-email', validateBody(emailSchema), sendResetEmail);

export default router;