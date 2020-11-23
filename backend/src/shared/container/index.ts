import { container } from 'tsyringe';

import '@modules/players/providers';

import PlayersRepository from '@modules/players/infra/typeorm/repositories/PlayersRepository';
import IPlayerRepository from '@modules/players/repositories/IPlayerRepository';
import IPlayerTokensRepository from '@modules/players/repositories/IPlayerTokensRepository';
import PlayerTokensRepository from '@modules/players/infra/typeorm/repositories/PlayerTokensRepository';
import IScoresRepository from '@modules/scores/repositories/IScoresRepository';
import ScoresRepository from '@modules/scores/infra/typeorm/repositories/ScoresRepository';
import IGamesRepository from '@modules/games/repositories/IGamesRepository';
import GamesRepository from '@modules/games/infra/typeorm/repositories/GamesRepository';
import ChampionshipRepository from '@modules/championship/infra/typeorm/repositories/ChampionshipRepository';
import IChampionshipRepository from '@modules/championship/repositories/IChampionshipRepository';

container.registerSingleton<IPlayerRepository>(
  'PlayersRepository',
  PlayersRepository,
);

container.registerSingleton<IPlayerTokensRepository>(
  'PlayerTokensRepository',
  PlayerTokensRepository,
);

container.registerSingleton<IScoresRepository>(
  'ScoresRepository',
  ScoresRepository,
);

container.registerSingleton<IGamesRepository>(
  'GamesRepository',
  GamesRepository,
);

container.registerSingleton<IChampionshipRepository>(
  'ChampionshipRepository',
  ChampionshipRepository,
);
