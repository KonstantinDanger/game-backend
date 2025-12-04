import express from 'express';
import { asyncHandler } from '@/utils/asyncHandler';
import { authorize } from './auth.middleware';
import { validate } from '@/middleware/validation.middleware';
import { authRateLimiter } from '@/middleware/rateLimit.middleware';
import {
  registerSchema,
  loginSchema,
  updateCurrentUserSchema,
} from '@/utils/validation';
import { registerController } from './controllers/register.controller';
import { loginUserController } from './controllers/login.controller';
import { logoutController } from './controllers/logout.controller';
import { getCurrentUserController } from './controllers/getCurrentUser.controller';
import { updateCurrentUserController } from './controllers/updateCurrentUser.controller';
import { refreshSessionController } from './controllers/refreshSession.controller';

const router = express.Router();

router.post(
  '/register',
  authRateLimiter,
  validate(registerSchema),
  asyncHandler(registerController),
);
router.post(
  '/login',
  authRateLimiter,
  validate(loginSchema),
  asyncHandler(loginUserController),
);
router.get('/current-user', asyncHandler(getCurrentUserController));
router.post('/logout', authorize, asyncHandler(logoutController));
router.put(
  '/player',
  authorize,
  validate(updateCurrentUserSchema),
  asyncHandler(updateCurrentUserController),
);
router.post('/refresh', authorize, asyncHandler(refreshSessionController));

export default router;
