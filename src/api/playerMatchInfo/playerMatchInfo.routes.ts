import express from 'express';
import { asyncHandler } from '@/utils/asyncHandler';
import { authorize, initUser } from '@/api/auth/auth.middleware';
import { createPlayerMatchInfoController } from './controllers/createPlayerMatchInfo.controller';
import { updatePlayerMatchInfoController } from './controllers/updatePlayerMatchInfo.controller';

const router = express.Router();

router.post('/', initUser, asyncHandler(createPlayerMatchInfoController));
router.put('/:id', initUser, asyncHandler(updatePlayerMatchInfoController));
router.patch('/:id', authorize, asyncHandler(updatePlayerMatchInfoController));

export default router;
