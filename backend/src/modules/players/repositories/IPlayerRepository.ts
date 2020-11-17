import Player from '@modules/players/infra/typeorm/entities/Player';
import ICreatePlayerDTO from '../dtos/ICreatePlayerDTO';

export default interface IPlayerRepository {
  create(data: ICreatePlayerDTO): Promise<Player>;
  findByEmail(email: string): Promise<Player | undefined>;
  findById(id: string): Promise<Player | undefined>;
  findAll(): Promise<Player[] | undefined>;
  save(player: Player): Promise<Player>;
}
