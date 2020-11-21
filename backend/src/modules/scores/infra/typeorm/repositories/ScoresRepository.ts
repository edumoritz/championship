import { getRepository, IsNull, Not, Repository } from 'typeorm';
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

  public async findByPlayerId(player_id: string): Promise<Score | undefined> {
    const score = await this.ormRepository.findOne({
      where: { player: player_id, closed_at: IsNull() },
    });
    return score;
  }

  public async save(score: Score): Promise<Score> {
    return this.ormRepository.save(score);
  }

  public async findById(id: string): Promise<Score | undefined> {
    const score = await this.ormRepository.findOne(id);
    return score;
  }

  public async findAll(): Promise<Score[] | undefined> {
    const scores = await this.ormRepository.find();
    return scores;
  }

  public async findAllClosed(): Promise<Score[] | undefined> {
    const scores = await this.ormRepository.find({
      where: { closed_at: Not(IsNull()) },
    });
    return scores;
  }
}

export default ScoresRepository;
