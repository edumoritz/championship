import { injectable, inject } from 'tsyringe';
import IScoresRepository from '@modules/scores/repositories/IScoresRepository';

import AppError from '@shared/errors/AppError';
import Score from '../infra/typeorm/entities/Score';

interface IRequest {
  player_id: string;
}

@injectable()
class GetScoreService {

  constructor(
    @inject('ScoresRepository')
    private scoresRepository: IScoresRepository,

  ) { }

  public async execute({ player_id }: IRequest): Promise<Score> {

    const score = await this.scoresRepository.findByPlayerId(player_id);

    if (!score) {
      throw new AppError('Score not found.');
    }

    return score;
  }
}

export default GetScoreService;