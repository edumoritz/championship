import { injectable, inject } from 'tsyringe';

import IPlayerRepository from '../repositories/IPlayerRepository';

import Player from '@modules/players/infra/typeorm/entities/Player';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreatePlayerService {

  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayerRepository,
  ) { }

  public async execute({ name, email, password }: IRequest): Promise<Player> {

    console.log(name)
    const player = await this.playersRepository.create({
      name,
      email,
      password,
    })

    return player
  }
}

export default CreatePlayerService;