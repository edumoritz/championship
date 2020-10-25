import { container } from 'tsyringe';

import '@modules/players/providers';

import PlayersRepository from '@modules/players/infra/typeorm/repositories/PlayersRepository';
import IPlayerRepository from '@modules/players/repositories/IPlayerRepository';
import IPlayerTokensRepository from '@modules/players/repositories/IPlayerTokensRepository';
import PlayerTokensRepository from '@modules/players/infra/typeorm/repositories/PlayerTokensRepository';

container.registerSingleton<IPlayerRepository>(
  'PlayersRepository',
  PlayersRepository,
);

container.registerSingleton<IPlayerTokensRepository>(
  'PlayerTokensRepository',
  PlayerTokensRepository,
)