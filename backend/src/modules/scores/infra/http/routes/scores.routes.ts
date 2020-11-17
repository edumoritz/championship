import ensureAuthenticated from '@modules/players/infra/http/middleware/ensureAuthenticated';
import { Router } from 'express';
import ScoreController from '../controller/ScoreController';

const scoresRouter = Router();

const scoresController = new ScoreController();

scoresRouter.use(ensureAuthenticated);
scoresRouter.get('/:id', scoresController.show);
scoresRouter.get('/', scoresController.showAll);

export default scoresRouter;
