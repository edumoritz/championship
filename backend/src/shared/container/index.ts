import { container } from 'tsyringe';

import '@modules/players/providers';

import PlayersRepository from '@modules/players/infra/typeorm/repositories/PlayersRepository';
import IPlayerRepository from '@modules/players/repositories/IPlayerRepository';
import IPlayerTokensRepository from '@modules/players/repositories/IPlayerTokensRepository';
import PlayerTokensRepository from '@modules/players/infra/typeorm/repositories/PlayerTokensRepository';
import IScoresRepository from '@modules/scores/repositories/IScoresRepository';
import ScoresRepository from '@modules/scores/infra/typeorm/repositories/ScoresRepository';

container.registerSingleton<IPlayerRepository>(
  'PlayersRepository',
  PlayersRepository,
);

container.registerSingleton<IPlayerTokensRepository>(
  'PlayerTokensRepository',
  PlayerTokensRepository,
)

container.registerSingleton<IScoresRepository>(
  'ScoresRepository',
  ScoresRepository,
)