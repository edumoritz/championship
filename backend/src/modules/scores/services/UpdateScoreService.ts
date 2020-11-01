import { injectable, inject } from 'tsyringe';

import IScoresRepository from '@modules/scores/repositories/IScoresRepository';

import AppError from '@shared/errors/AppError';
import Score from '../infra/typeorm/entities/Score';
import ICreateScoreDTO from '../dtos/ICreateScoreDTO';

@injectable()
class UpdateScoreService {
  constructor(
    @inject('ScoresRepository')
    private scoresRepository: IScoresRepository,
  ) { }

  public async execute(score: ICreateScoreDTO): Promise<Score> {

    let findScore = await this.scoresRepository.findById(String(score.player));

    if (!findScore) throw new AppError('Score not found');
    findScore = score;

    return this.scoresRepository.save(findScore);
  }
}
export default UpdateScoreService;