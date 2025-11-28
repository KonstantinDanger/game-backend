import express from 'express';
import { asyncHandler } from '@/utils/asyncHandler';
import { createMatchController } from './controllers/createMatch.controller';
import { updateMatchController } from './controllers/updateMatch.controller';
import { getMatchController } from './controllers/getMatch.controller';
import { listMatchesController } from './controllers/listMatches.controller';

const router = express.Router();

router.post('/', asyncHandler(createMatchController));
router.put('/:id', asyncHandler(updateMatchController));
router.get('/', asyncHandler(listMatchesController));
router.get('/:id', asyncHandler(getMatchController));

export default router;
