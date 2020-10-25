import CreatePlayerService from '@modules/players/services/CreatePlayerService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class PlayerController {
  public async create(request: Request, response: Response): Promise<Response> {

    // const player_id = request.player.id;
    const { name, email, password } = request.body;

    console.log('1')
    const createPlayer = container.resolve(CreatePlayerService);
    console.log('2')

    const player = await createPlayer.execute({
      name,
      email,
      password,
    });



    return response.json(player);
  }
}