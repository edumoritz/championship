import { Router } from 'express';
import PlayerController from '../controller/PlayerControllers';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const playersRouter = Router();
const playersController = new PlayerController();

playersRouter.use(ensureAuthenticated);

playersRouter.post('/', playersController.create)
playersRouter.get('/', playersController.showAll)
playersRouter.get('/:id', playersController.show)

export default playersRouter;