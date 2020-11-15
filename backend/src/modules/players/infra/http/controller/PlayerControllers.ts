import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import CreatePlayerService from '@modules/players/services/CreatePlayerService';
import GetPlayerService from '@modules/players/services/GetPlayersService';
import GetAllPlayerService from '@modules/players/services/GetAllPlayersService';

export default class PlayerController {
  public async create(request: Request, response: Response): Promise<Response> {

    const { name, email, password } = request.body;

    const createPlayer = container.resolve(CreatePlayerService);

    const player = await createPlayer.execute({
      name,
      email,
      password,
    });

    return response.json(classToClass(player));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const player_id = request.player.id;

    const showPlayer = container.resolve(GetPlayerService);

    const player = await showPlayer.execute({ player_id })

    return response.json(classToClass(player));
  }

  public async showAll(request: Request, response: Response): Promise<Response> {
    const player_id = request.player.id;
    const showPlayers = container.resolve(GetAllPlayerService);

    const players = await showPlayers.execute()

    return response.json(classToClass(players));

  }
}