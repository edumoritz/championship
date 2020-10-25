import ICreatePlayerDTO from '@modules/players/dtos/ICreatePlayerDTO';
import Player from '@modules/players/infra/typeorm/entities/Player';
import IPlayerRepository from "@modules/players/repositories/IPlayerRepository";
import { getRepository, Repository } from "typeorm";

class PlayersRepository implements IPlayerRepository {
  private ormRepository: Repository<Player>;

  constructor() {
    this.ormRepository = getRepository(Player)
  }
  public async create({ name, email, password }: ICreatePlayerDTO): Promise<Player> {
    console.log(email)
    const player = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(player);

    return player;
  }

}
export default PlayersRepository;
