import express from 'express';
import { authorize } from './auth.middleware.js';
import { registerController } from './controllers/register.controller.js';
import { loginUserController } from './controllers/login.controller.js';
import { logoutController } from './controllers/logout.controller.js';
import { currentUserController } from './controllers/currentUser.controller.js';
import { updatePlayerController } from './controllers/updatePlayer.controller.js';
import { refreshSessionController } from './controllers/refreshSession.controller.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginUserController);
router.get('/current-user', currentUserController);
router.post('/logout', authorize, logoutController);
router.put('/player', authorize, updatePlayerController);
router.post('/refresh', authorize, refreshSessionController);

export default router;
