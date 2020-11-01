import { getRepository, Repository } from 'typeorm';
import ICreateScoreDTO from '@modules/scores/dtos/ICreateScoreDTO';
import IScoresRepository from '@modules/scores/repositories/IScoresRepository';
import Score from '../entities/Score';

class ScoresRepository implements IScoresRepository {
  private ormRepository: Repository<Score>;

  constructor() {
    this.ormRepository = getRepository(Score);
  }


  public async create(score: ICreateScoreDTO): Promise<Score> {

    const scoreRepo = this.ormRepository.create({ ...score });

    const newScore = await this.ormRepository.save({ ...scoreRepo });

    return newScore;
  }
  public async findById(player_id: string): Promise<Score | undefined> {
    const score = await this.ormRepository.findOne({ where: { player: player_id } });
    return score;
  }

  public async save(score: Score): Promise<Score> {
    return this.ormRepository.save(score);
  }


}

export default ScoresRepository;