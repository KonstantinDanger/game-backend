import express from 'express';
import { asyncHandler } from '@/utils/asyncHandler.js';
import { createMatchController } from './controllers/createMatch.controller.js';
import { updateMatchController } from './controllers/updateMatch.controller.js';
import { getMatchController } from './controllers/getMatch.controller.js';
import { listMatchesController } from './controllers/listMatches.controller.js';

const router = express.Router();

router.post('/', asyncHandler(createMatchController));
router.put('/:id', asyncHandler(updateMatchController));
router.get('/', asyncHandler(listMatchesController));
router.get('/:id', asyncHandler(getMatchController));

export default router;
