import Player from '@modules/players/infra/typeorm/entities/Player';
import ICreatePlayerDTO from '../dtos/ICreatePlayerDTO';

export default interface IPlayerRepository {
  create(data: ICreatePlayerDTO): Promise<Player>;
}