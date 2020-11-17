import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGamesRepository from '../repositories/IGamesRepository';
import Game from '../infra/typeorm/entities/Games';

interface IRequest {
  game_id: string;
}

@injectable()
class GetGameService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
  ) {}

  public async execute({ game_id }: IRequest): Promise<Game> {
    const game = await this.gamesRepository.findById(game_id);

    if (!game) {
      throw new AppError('Game not found.');
    }

    return game;
  }
}

export default GetGameService;
