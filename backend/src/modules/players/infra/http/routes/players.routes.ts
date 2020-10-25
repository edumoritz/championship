import { Router } from 'express';
import PlayerController from '../controller/PlayerControllers';

const playersRouter = Router();
const playersController = new PlayerController();

playersRouter.post('/', playersController.create)

export default playersRouter;