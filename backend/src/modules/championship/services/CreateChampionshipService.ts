import Championship from '@modules/championship/infra/typeorm/entities/Championship';
import { injectable, inject } from 'tsyringe';

import Player from '@modules/players/infra/typeorm/entities/Player';
import AppError from '@shared/errors/AppError';
import IPlayerRepository from '@modules/players/repositories/IPlayerRepository';
import IChampionshipRepository from '../repositories/IChampionshipRepository';

interface IRequest {
  name: string;
  players: Player[];
}

@injectable()
class CreateChampionshipService {
  constructor(
    @inject('ChampionshipRepository')
    private championshipRepository: IChampionshipRepository,

    @inject('PlayersRepository')
    private playersRepository: IPlayerRepository,
  ) {}

  public async execute({ name, players }: IRequest): Promise<Championship> {
    if (players.length < 4) {
      throw new AppError('Must have more than 4 players.');
    }
    try {
      const newChampionship = await this.championshipRepository.create({
        name,
      });
      players.map(async player => {
        const findPlayer = await this.playersRepository.findById(player.id);
        if (findPlayer) {
          findPlayer.championship_id = newChampionship;
          await this.playersRepository.save(findPlayer);
        }
      });
      return newChampionship;
    } catch (err) {
      throw new AppError('Erro to create new championship.');
    }
  }
}

export default CreateChampionshipService;
