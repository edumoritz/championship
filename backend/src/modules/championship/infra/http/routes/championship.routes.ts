import { Router } from 'express';
import ensureAuthenticated from '@modules/players/infra/http/middleware/ensureAuthenticated';
import ChampionshipController from '../controller/ChampionshipControllers';

const championshipRouter = Router();
const championshipController = new ChampionshipController();

championshipRouter.use(ensureAuthenticated);
championshipRouter.post('/', championshipController.create);

export default championshipRouter;
