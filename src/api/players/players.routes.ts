import express from 'express';
import { authorize } from '../auth/auth.middleware.js';
import { getPlayerController } from './controllers/getPlayer.controller.js';
import { listPlayersController } from './controllers/listPlayers.controller.js';

const router = express.Router();

router.get('/', authorize, listPlayersController);
router.post('/', authorize, listPlayersController); // POST support for list (frontend uses POST)
router.get('/:id', authorize, getPlayerController);

export default router;
