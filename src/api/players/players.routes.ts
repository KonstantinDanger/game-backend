import express from 'express';
import { asyncHandler } from '@/utils/asyncHandler';
import { authorize, initUser } from '@/api/auth/auth.middleware';
import { validate, validateQuery } from '@/middleware/validation.middleware';
import {
  getPlayerSchema,
  listPlayersQuerySchema,
  updatePlayerSchema,
  deletePlayerSchema,
} from '@/utils/validation';
import { getPlayerController } from './controllers/getPlayer.controller';
import { listPlayersController } from './controllers/listPlayers.controller';
import { updatePlayerController } from './controllers/updatePlayer.controller';
import { deletePlayerController } from './controllers/deletePlayer.controller';

const router = express.Router();

router.get(
  '/',
  initUser,
  validateQuery(listPlayersQuerySchema),
  asyncHandler(listPlayersController),
);
router.get(
  '/:id',
  initUser,
  validate(getPlayerSchema),
  asyncHandler(getPlayerController),
);
router.patch(
  '/:id',
  authorize,
  validate(updatePlayerSchema),
  asyncHandler(updatePlayerController),
);
router.delete(
  '/:id',
  authorize,
  validate(deletePlayerSchema),
  asyncHandler(deletePlayerController),
);

export default router;
