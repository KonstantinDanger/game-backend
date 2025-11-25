import express from 'express';
import { authorize } from '../auth/auth.middleware.js';
import { createMatchController } from './controllers/createMatch.controller.js';
import { updateMatchController } from './controllers/updateMatch.controller.js';
import { getMatchController } from './controllers/getMatch.controller.js';
import { listMatchesController } from './controllers/listMatches.controller.js';

const router = express.Router();

router.post('/', authorize, createMatchController);
router.put('/:id', authorize, updateMatchController);
router.get('/', authorize, listMatchesController);
router.get('/:id', authorize, getMatchController);

export default router;
