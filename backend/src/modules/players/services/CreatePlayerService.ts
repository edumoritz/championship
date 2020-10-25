import { injectable, inject } from 'tsyringe';

import IPlayerRepository from '../repositories/IPlayerRepository';

import Player from '@modules/players/infra/typeorm/entities/Player';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

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

    @inject('HashProvider')
    private hashProvider: IHashProvider,

  ) { }

  public async execute({ name, email, password }: IRequest): Promise<Player> {

    const checkPlayerExists = await this.playersRepository.findByEmail(email);

    if (checkPlayerExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const player = await this.playersRepository.create({
      name,
      email,
      password: hashedPassword,
    });


    return player
  }
}

export default CreatePlayerService;