import { inject } from 'tsyringe';
import { injectable } from 'tsyringe';
import ICreateScoreDTO from '@modules/scores/dtos/ICreateScoreDTO';
import Score from '../infra/typeorm/entities/Score';
import IScoresRepository from '../repositories/IScoresRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateScoreService {
  constructor(
    @inject('ScoresRepository')
    private scoresRepository: IScoresRepository,
  ) { }

  public async execute(score: ICreateScoreDTO): Promise<Score> {
    const { player } = score;
    const findScore = await this.scoresRepository.findByPlayerId(String(player));
    if (findScore) throw new AppError('This player already have an score.');

    const scoreRepo = await this.scoresRepository.create({ ...score });

    return scoreRepo;
  }
}

export default CreateScoreService;