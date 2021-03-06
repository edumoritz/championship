import { Router } from 'express';

import playersRouter from '@modules/players/infra/http/routes/players.routes';
import sessionsRouter from '@modules/players/infra/http/routes/session.routes';
import scoresRouter from '@modules/scores/infra/http/routes/scores.routes';
import gamesRouter from '@modules/games/infra/http/routes/games.routes';
import championshipRouter from '@modules/championship/infra/http/routes/championship.routes';

const routes = Router();

routes.use('/players', playersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/scores', scoresRouter);
routes.use('/games', gamesRouter);
routes.use('/championship', championshipRouter);

export default routes;
