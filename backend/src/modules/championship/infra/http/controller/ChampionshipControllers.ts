import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import CreateChampionshipService from '@modules/championship/services/CreateChampionshipService';

export default class ChampionshipController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, players } = request.body;

    const createChampionship = container.resolve(CreateChampionshipService);

    const championship = await createChampionship.execute({
      name,
      players,
    });

    return response.json(classToClass(championship));
  }
}
