import { injectable, inject } from 'tsyringe';

import Player from '@modules/players/infra/typeorm/entities/Player';
import AppError from '@shared/errors/AppError';
import IPlayerRepository from '../repositories/IPlayerRepository';

@injectable()
class GetAllPlayerService {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayerRepository,
  ) {}

  public async execute(): Promise<Player[]> {
    const players = await this.playersRepository.findAll();

    if (!players || players.length <= 0) {
      throw new AppError('Players not found.');
    }

    const newPlayers = players.map(player => {
      // eslint-disable-next-line no-param-reassign
      delete player.password;
      return player;
    });

    return newPlayers;
  }
}

export default GetAllPlayerService;
