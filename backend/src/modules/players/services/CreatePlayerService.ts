import { injectable, inject } from 'tsyringe';

import IPlayerRepository from '../repositories/IPlayerRepository';

import Player from '@modules/players/infra/typeorm/entities/Player';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IScoresRepository from '@modules/scores/repositories/IScoresRepository';
import ICreateScoreDTO from '@modules/scores/dtos/ICreateScoreDTO';

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

    @inject('ScoresRepository')
    private scoresRepository: IScoresRepository,

  ) { }

  public async execute({ name, email, password }: IRequest): Promise<Player> {

    const checkPlayerExists = await this.playersRepository.findByEmail(email);

    if (checkPlayerExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    try {

      const player = await this.playersRepository.create({
        name,
        email,
        password: hashedPassword,
      });
  
      const newScore: ICreateScoreDTO = {
        games: 0,
        goal_against: 0,
        goal_difference: 0,
        goal_pro: 0,
        loss: 0,
        points: 0,
        ties: 0,
        utilization: 0,
        wins: 0,
        player
      }
      await this.scoresRepository.create(newScore);

      return player

    } catch (err) {
      throw new AppError('Erro to create new player.');

    }  
    
  }
}

export default CreatePlayerService;