import express from 'express';
import { asyncHandler } from '@/utils/asyncHandler';
import { authorize } from './auth.middleware';
import { registerController } from './controllers/register.controller';
import { loginUserController } from './controllers/login.controller';
import { logoutController } from './controllers/logout.controller';
import { currentUserController } from './controllers/currentUser.controller';
import { updatePlayerController } from './controllers/updatePlayer.controller';
import { refreshSessionController } from './controllers/refreshSession.controller';

const router = express.Router();

router.post('/register', asyncHandler(registerController));
router.post('/login', asyncHandler(loginUserController));
router.get('/current-user', asyncHandler(currentUserController));
router.post('/logout', authorize, asyncHandler(logoutController));
router.put('/player', authorize, asyncHandler(updatePlayerController));
router.post('/refresh', authorize, asyncHandler(refreshSessionController));

export default router;
