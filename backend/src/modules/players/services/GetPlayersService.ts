import { injectable, inject } from 'tsyringe';

import Player from '@modules/players/infra/typeorm/entities/Player';
import AppError from '@shared/errors/AppError';
import IPlayerRepository from '../repositories/IPlayerRepository';

interface IRequest {
  player_id: string;
}

@injectable()
class GetPlayerService {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayerRepository,
  ) {}

  public async execute({ player_id }: IRequest): Promise<Player> {
    const player = await this.playersRepository.findById(player_id);

    if (!player) {
      throw new AppError('Player not found.');
    }

    return player;
  }
}

export default GetPlayerService;
