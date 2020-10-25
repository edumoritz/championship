import IPlayerTokensRepository from "@modules/players/repositories/IPlayerTokensRepository";
import { getRepository, Repository } from "typeorm";
import PlayerToken from '../entities/PlayerToken';

class PlayerTokensRepository implements IPlayerTokensRepository {
  private ormRepository: Repository<PlayerToken>;

  constructor() {
    this.ormRepository = getRepository(PlayerToken);
  }

  public async generate(player_id: string): Promise<PlayerToken> {
    const playerToken = this.ormRepository.create({
      player_id,
    });

    await this.ormRepository.save(playerToken);

    return playerToken;
  }
  public async findByToken(token: string): Promise<PlayerToken | undefined> {
    const playerToken = await this.ormRepository.findOne({
      where: { token },
    });

    return playerToken;
  }

}

export default PlayerTokensRepository;