import express from 'express';
import { asyncHandler } from '@/utils/asyncHandler.js';
import { authorize } from './auth.middleware.js';
import { registerController } from './controllers/register.controller.js';
import { loginUserController } from './controllers/login.controller.js';
import { logoutController } from './controllers/logout.controller.js';
import { currentUserController } from './controllers/currentUser.controller.js';
import { updatePlayerController } from './controllers/updatePlayer.controller.js';
import { refreshSessionController } from './controllers/refreshSession.controller.js';

const router = express.Router();

router.post('/register', asyncHandler(registerController));
router.post('/login', asyncHandler(loginUserController));
router.get('/current-user', asyncHandler(currentUserController));
router.post('/logout', authorize, asyncHandler(logoutController));
router.put('/player', authorize, asyncHandler(updatePlayerController));
router.post('/refresh', authorize, asyncHandler(refreshSessionController));

export default router;
