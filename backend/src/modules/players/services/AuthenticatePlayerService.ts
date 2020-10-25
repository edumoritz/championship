import Player from '@modules/players/infra/typeorm/entities/Player';
import { inject, injectable } from "tsyringe";
import IPlayerRepository from "../repositories/IPlayerRepository";

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
  ) { }

  // public async execute({ email, password }: IRequest): Promise<IResponse> {



  // }
}

export default AuthenticatePlayerService;