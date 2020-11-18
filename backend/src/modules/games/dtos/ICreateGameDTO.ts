import Player from '@modules/players/infra/typeorm/entities/Player';

export default interface ICreateGameDTO {
  id: string;
  player1: Player;
  player2: Player;
  goals_player1: number;
  goals_player2: number;
  created_at?: Date;
}
