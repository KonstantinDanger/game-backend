import express from 'express';
import { asyncHandler } from '@/utils/asyncHandler.js';
import { getPlayerController } from './controllers/getPlayer.controller.js';
import { listPlayersController } from './controllers/listPlayers.controller.js';

const router = express.Router();

router.get('/', asyncHandler(listPlayersController));
router.get('/:id', asyncHandler(getPlayerController));

export default router;
