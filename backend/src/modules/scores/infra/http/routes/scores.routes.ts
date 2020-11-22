import ensureAuthenticated from '@modules/players/infra/http/middleware/ensureAuthenticated';
import { Router } from 'express';
import ScoreController from '../controller/ScoreController';

const scoresRouter = Router();

const scoresController = new ScoreController();

scoresRouter.use(ensureAuthenticated);
scoresRouter.get('/closed', scoresController.showAllClosed);
scoresRouter.get('/', scoresController.showAll);
scoresRouter.get('/:id', scoresController.show);

export default scoresRouter;
