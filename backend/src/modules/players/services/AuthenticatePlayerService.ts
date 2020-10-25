import { inject, injectable } from "tsyringe";
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import Player from '@modules/players/infra/typeorm/entities/Player';
import IPlayerRepository from "../repositories/IPlayerRepository";
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { sign } from "jsonwebtoken";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  player: Player;
  token: string;
}

@injectable()
class AuthenticatePlayerService {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayerRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,

  ) { }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const player = await this.playersRepository.findByEmail(email);

    if (!player) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(password, player.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: player.id,
      expiresIn,
    });

    return {
      player,
      token,
    }


  }
}

export default AuthenticatePlayerService;