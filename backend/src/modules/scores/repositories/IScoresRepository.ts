import ICreateScoreDTO from '../dtos/ICreateScoreDTO';
import Score from '../infra/typeorm/entities/Score';

export default interface IScoresRepository {
  create(score: ICreateScoreDTO): Promise<Score>;
  findByPlayerId(player_id: string): Promise<Score | undefined>;
  findById(id: string): Promise<Score | undefined>;
  save(score: Score): Promise<Score>;
  findAll(): Promise<Score[] | undefined>;
}
