import express from 'express';
import { asyncHandler } from '@/utils/asyncHandler';
import { getPlayerController } from './controllers/getPlayer.controller';
import { listPlayersController } from './controllers/listPlayers.controller';

const router = express.Router();

router.get('/', asyncHandler(listPlayersController));
router.get('/:id', asyncHandler(getPlayerController));

export default router;
