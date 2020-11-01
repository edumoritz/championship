import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import CreateScoreService from '@modules/scores/services/CreateScoreService';
import GetScoreService from '@modules/scores/services/GetScoreService';
import UpdateScoreService from '@modules/scores/services/UpdateScoreService';

export default class ScoreController {
  public async create(request: Request, response: Response): Promise<Response> {
    const player_id = request.player.id;

    console.log('body: ', request.body)
    const createScore = container.resolve(CreateScoreService);

    const score = await createScore.execute({
      ...request.body
    })

    return response.json(score);

  }

  public async show(request: Request, response: Response): Promise<Response> {
    const player_id = request.player.id;

    const showScore = container.resolve(GetScoreService);

    const score = await showScore.execute({ player_id })

    return response.json(classToClass(score));
  }

  public async update(request: Request, response: Response): Promise<Response> {

    const updateScore = container.resolve(UpdateScoreService);

    const score = await updateScore.execute({
      ...request.body,
      player: request.player.id
    });

    return response.json(classToClass(score));
  }
}