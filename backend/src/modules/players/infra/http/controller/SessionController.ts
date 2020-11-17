import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import AuthenticatePlayerService from '@modules/players/services/AuthenticatePlayerService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticatePlayerService = container.resolve(
      AuthenticatePlayerService,
    );

    const { player, token } = await authenticatePlayerService.execute({
      email,
      password,
    });

    return response.json({ player: classToClass(player), token });
  }
}
