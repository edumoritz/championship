import { injectable, inject } from 'tsyringe';
import IScoresRepository from '@modules/scores/repositories/IScoresRepository';

import AppError from '@shared/errors/AppError';
import Score from '../infra/typeorm/entities/Score';

@injectable()
class GetAllScoresService {
  constructor(
    @inject('ScoresRepository')
    private scoresRepository: IScoresRepository,
  ) {}

  public async execute(): Promise<Score[]> {
    const scores = await this.scoresRepository.findAll();

    if (!scores || scores.length <= 0) {
      throw new AppError('Scores not found.');
    }

    return scores.map(res => {
      delete res.player.password;
      return res;
    });
  }
}

export default GetAllScoresService;
