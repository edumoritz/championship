import ICreateGameDTO from "../dtos/ICreateGameDTO";
import Game from "../infra/typeorm/entities/Games";

export default interface IGamesRepository {
  create(game: ICreateGameDTO): Promise<Game>;
  findById(id: string): Promise<Game | undefined>;
  findAll(): Promise<Game[] | undefined>;
}