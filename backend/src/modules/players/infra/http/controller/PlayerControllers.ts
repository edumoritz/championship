import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreatePlayerService from '@modules/players/services/CreatePlayerService';

export default class PlayerController {
  public async create(request: Request, response: Response): Promise<Response> {

    const { name, email, password } = request.body;

    const createPlayer = container.resolve(CreatePlayerService);

    const player = await createPlayer.execute({
      name,
      email,
      password,
    });

    return response.json(player);
  }
}