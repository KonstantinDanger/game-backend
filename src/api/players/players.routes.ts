import express from 'express';
import { asyncHandler } from '@/utils/asyncHandler';
import { authorize, initUser } from '@/api/auth/auth.middleware';
import { getPlayerController } from './controllers/getPlayer.controller';
import { listPlayersController } from './controllers/listPlayers.controller';
import { updatePlayerController } from './controllers/updatePlayer.controller';
import { deletePlayerController } from './controllers/deletePlayer.controller';

const router = express.Router();

router.get('/', initUser, asyncHandler(listPlayersController));
router.get('/:id', initUser, asyncHandler(getPlayerController));
router.patch('/:id', authorize, asyncHandler(updatePlayerController));
router.delete('/:id', authorize, asyncHandler(deletePlayerController));

export default router;
