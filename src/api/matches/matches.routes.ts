import express from 'express';
import { createMatchController } from './controllers/createMatch.controller.js';
import { updateMatchController } from './controllers/updateMatch.controller.js';
import { getMatchController } from './controllers/getMatch.controller.js';
import { listMatchesController } from './controllers/listMatches.controller.js';

const router = express.Router();

router.post('/', createMatchController);
router.put('/:id', updateMatchController);
router.get('/', listMatchesController);
router.get('/:id', getMatchController);

export default router;
