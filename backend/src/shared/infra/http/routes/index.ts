import { Router } from 'express';

import playersRouter from '@modules/players/infra/http/routes/players.routes';
import sessionsRouter from '@modules/players/infra/http/routes/session.routes';
import scoresRouter from '@modules/scores/infra/http/routes/scores.routes';

const routes = Router();

routes.use('/players', playersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/scores', scoresRouter);

export default routes;
