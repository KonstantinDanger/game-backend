import express from 'express';
import { authorize } from './auth.middleware.js';
import { registerHandler } from './handlers/register.js';
import { loginHandler } from './handlers/login.js';
import { logoutHandler } from './handlers/logout.js';
import { meHandler } from './handlers/me.js';
import { updatePlayerHandler } from './handlers/updatePlayer.js';
import { refreshTokenHandler } from './handlers/refreshToken.js';

const router = express.Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/logout', authorize, logoutHandler);
router.get('/me', authorize, meHandler);
router.put('/player', authorize, updatePlayerHandler);
router.post('/refresh', authorize, refreshTokenHandler);

export default router;
