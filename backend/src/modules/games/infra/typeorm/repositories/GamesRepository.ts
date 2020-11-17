import { getRepository, Repository } from 'typeorm';
import IGamesRepository from '@modules/games/repositories/IGamesRepository';
import ICreateGameDTO from '@modules/games/dtos/ICreateGameDTO';
import Game from '../entities/Games';

class GamesRepository implements IGamesRepository {
  private ormRepository: Repository<Game>;

  constructor() {
    this.ormRepository = getRepository(Game);
  }

  public async create(game: ICreateGameDTO): Promise<Game> {
    const gameRepo = this.ormRepository.create({ ...game });

    await this.ormRepository.save({ ...gameRepo });

    return gameRepo;
  }

  public async findById(id: string): Promise<Game | undefined> {
    const game = await this.ormRepository.findOne(id);
    return game;
  }

  public async findAll(): Promise<Game[] | undefined> {
    const games = await this.ormRepository.find();
    return games;
  }
}

export default GamesRepository;
