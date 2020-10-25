import { Router } from 'express';

import playersRouter from '@modules/players/infra/http/routes/players.routes';

const routes = Router();

routes.use('/players', playersRouter);
// routes.use('/scores');

export default routes;
