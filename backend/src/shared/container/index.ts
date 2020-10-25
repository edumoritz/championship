import { container } from 'tsyringe';
import PlayersRepository from '@modules/players/infra/typeorm/repositories/PlayersRepository';
import IPlayerRepository from '@modules/players/repositories/IPlayerRepository';

container.registerSingleton<IPlayerRepository>(
  'PlayersRepository',
  PlayersRepository,
)