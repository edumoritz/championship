import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import GetGameService from '@modules/games/services/GetGameService';
import GetAllGamesService from '@modules/games/services/GetAllGamesService';
import CreateGameService from '@modules/games/services/CreateGameService';

export default class GameController {
  public async create(request: Request, response: Response): Promise<Response> {

    const createGame = container.resolve(CreateGameService);

    const game = await createGame.execute({
      ...request.body
    })

    return response.json(game);

  }

  public async show(request: Request, response: Response): Promise<Response> {
    const player_id = request.params.id;

    const showGame = container.resolve(GetGameService);

    const game = await showGame.execute({ player_id })

    return response.json(classToClass(game));
  }

  public async showAll(request: Request, response: Response): Promise<Response> {
    
    const showGames = container.resolve(GetAllGamesService);

    const games = await showGames.execute()

    return response.json(classToClass(games));

  }

}