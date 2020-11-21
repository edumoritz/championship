import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import GetScoreService from '@modules/scores/services/GetScoreService';
import GetAllScoresService from '@modules/scores/services/GetAllScoresService';
import GetAllScoresClosedService from '@modules/scores/services/GetAllScoresClosedService';

export default class ScoreController {
  public async show(request: Request, response: Response): Promise<Response> {
    const player_id = request.params.id;

    const showScore = container.resolve(GetScoreService);

    const score = await showScore.execute({ player_id });

    return response.json(classToClass(score));
  }

  public async showAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const showScores = container.resolve(GetAllScoresService);

    const scores = await showScores.execute();

    return response.json(classToClass(scores));
  }

  public async showAllClosed(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const showScores = container.resolve(GetAllScoresClosedService);

    const scores = await showScores.execute();

    return response.json(classToClass(scores));
  }
}
