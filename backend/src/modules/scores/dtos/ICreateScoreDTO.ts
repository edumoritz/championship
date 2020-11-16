import Player from "@modules/players/infra/typeorm/entities/Player";

export default interface ICreateScoreDTO {
  id: string;
  player: Player;
  points: number;
  games: number;
  wins: number;
  loss: number;
  ties: number;
  goal_pro: number;
  goal_against: number;
  goal_difference: number;
  utilization: number;
}