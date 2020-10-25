import PlayerToken from "../infra/typeorm/entities/PlayerToken";

export default interface IPlayerTokensRepository {
  generate(player_id: string): Promise<PlayerToken>;
  findByToken(token: string): Promise<PlayerToken | undefined>;
}