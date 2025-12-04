import express from 'express';
import { asyncHandler } from '@/utils/asyncHandler';
import { authorize, initUser } from '@/api/auth/auth.middleware';
import { validate, validateQuery } from '@/middleware/validation.middleware';
import {
  createMatchSchema,
  updateMatchSchema,
  getMatchSchema,
  deleteMatchSchema,
  listMatchesQuerySchema,
} from '@/utils/validation';
import { createMatchController } from './controllers/createMatch.controller';
import { updateMatchController } from './controllers/updateMatch.controller';
import { getMatchController } from './controllers/getMatch.controller';
import { listMatchesController } from './controllers/listMatches.controller';
import { deleteMatchController } from './controllers/deleteMatch.controller';

const router = express.Router();

router.post(
  '/',
  initUser,
  validate(createMatchSchema),
  asyncHandler(createMatchController),
);
router.put(
  '/:id',
  initUser,
  validate(updateMatchSchema),
  asyncHandler(updateMatchController),
);
router.patch(
  '/:id',
  authorize,
  validate(updateMatchSchema),
  asyncHandler(updateMatchController),
);
router.delete(
  '/:id',
  authorize,
  validate(deleteMatchSchema),
  asyncHandler(deleteMatchController),
);
router.get(
  '/',
  validateQuery(listMatchesQuerySchema),
  asyncHandler(listMatchesController),
);
router.get('/:id', validate(getMatchSchema), asyncHandler(getMatchController));

export default router;
