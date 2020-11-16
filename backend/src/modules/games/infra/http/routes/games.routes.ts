import ensureAuthenticated from '@modules/players/infra/http/middleware/ensureAuthenticated';
import { Router } from 'express';
import GameController from '../controller/GameControllers';

const gamesRouter = Router();

const gamesController = new GameController();

gamesRouter.use(ensureAuthenticated);
gamesRouter.post('/', gamesController.create);
gamesRouter.get('/:id', gamesController.show);
gamesRouter.get('/', gamesController.showAll);

export default gamesRouter;
