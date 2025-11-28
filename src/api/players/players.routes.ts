import express from 'express';
import { getPlayerController } from './controllers/getPlayer.controller.js';
import { listPlayersController } from './controllers/listPlayers.controller.js';

const router = express.Router();

router.get('/', listPlayersController);
router.get('/:id', getPlayerController);

export default router;
