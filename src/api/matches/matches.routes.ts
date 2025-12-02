import express from 'express';
import { asyncHandler } from '@/utils/asyncHandler';
import { authorize, initUser } from '@/api/auth/auth.middleware';
import { createMatchController } from './controllers/createMatch.controller';
import { updateMatchController } from './controllers/updateMatch.controller';
import { getMatchController } from './controllers/getMatch.controller';
import { listMatchesController } from './controllers/listMatches.controller';
import { deleteMatchController } from './controllers/deleteMatch.controller';

const router = express.Router();

router.post('/', initUser, asyncHandler(createMatchController));
router.put('/:id', initUser, asyncHandler(updateMatchController));
router.patch('/:id', authorize, asyncHandler(updateMatchController));
router.delete('/:id', authorize, asyncHandler(deleteMatchController));
router.get('/', asyncHandler(listMatchesController));
router.get('/:id', asyncHandler(getMatchController));

export default router;
