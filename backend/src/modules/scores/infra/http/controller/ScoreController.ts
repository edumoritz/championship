import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
// import CreateScoreService from '@modules/scores/services/CreateScoreService';
import GetScoreService from '@modules/scores/services/GetScoreService';
import GetAllScoresService from '@modules/scores/services/GetAllScoresService';

export default class ScoreController {
  // public async create(request: Request, response: Response): Promise<Response> {
  //   const createScore = container.resolve(CreateScoreService);

  //   const score = await createScore.execute({
  //     ...request.body,
  //   });

  //   return response.json(score);
  // }

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
    const showPlayers = container.resolve(GetAllScoresService);

    const scores = await showPlayers.execute();

    return response.json(classToClass(scores));
  }
}
