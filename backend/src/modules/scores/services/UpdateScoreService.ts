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

    const findScore = await this.scoresRepository.findById(score.id);

    if (!findScore) throw new AppError('Score not found');
    findScore.games = score.games;
    findScore.goal_against = score.goal_against;
    findScore.goal_difference = score.goal_difference;
    findScore.goal_pro = score.goal_pro;
    findScore.loss = score.loss;
    findScore.points = score.points;
    findScore.ties = score.ties;
    findScore.wins = score.wins;

    return this.scoresRepository.save(findScore);
  }
}
export default UpdateScoreService;