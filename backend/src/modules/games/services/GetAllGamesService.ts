import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Game from '../infra/typeorm/entities/Games';
import IGamesRepository from '../repositories/IGamesRepository';

@injectable()
class GetAllGamesService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
  ) {}

  public async execute(): Promise<Game[]> {
    const games = await this.gamesRepository.findAll();

    if (!games || games.length <= 0) {
      throw new AppError('Games not found.');
    }

    return games;
  }
}

export default GetAllGamesService;
