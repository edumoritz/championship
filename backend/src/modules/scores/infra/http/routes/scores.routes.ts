import ensureAuthenticated from '@modules/players/infra/http/middleware/ensureAuthenticated';
import { Router } from 'express';
import ScoreController from '../controller/ScoreController';

const scoresRouter = Router();

const scoresController = new ScoreController();

scoresRouter.use(ensureAuthenticated);
scoresRouter.post('/', scoresController.create);
scoresRouter.get('/:id', scoresController.show);
scoresRouter.put('/:id', scoresController.update);

export default scoresRouter;
