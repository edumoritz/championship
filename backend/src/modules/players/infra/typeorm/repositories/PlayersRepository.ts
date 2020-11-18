import { getRepository, Repository } from 'typeorm';

import ICreatePlayerDTO from '@modules/players/dtos/ICreatePlayerDTO';
import Player from '@modules/players/infra/typeorm/entities/Player';
import IPlayerRepository from '@modules/players/repositories/IPlayerRepository';

class PlayersRepository implements IPlayerRepository {
  private ormRepository: Repository<Player>;

  constructor() {
    this.ormRepository = getRepository(Player);
  }

  public async findAll(): Promise<Player[] | undefined> {
    const players = await this.ormRepository.find();
    return players;
  }

  public async findByEmail(email: string): Promise<Player | undefined> {
    const player = await this.ormRepository.findOne({ where: { email } });
    return player;
  }

  public async findById(id: string): Promise<Player | undefined> {
    const player = await this.ormRepository.findOne(id);
    return player;
  }

  public async save(player: Player): Promise<Player> {
    return this.ormRepository.save(player);
  }

  public async create({
    name,
    email,
    password,
  }: ICreatePlayerDTO): Promise<Player> {
    const player = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(player);

    return player;
  }
}
export default PlayersRepository;
