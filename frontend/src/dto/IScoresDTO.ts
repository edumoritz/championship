/* eslint-disable camelcase */
export interface Score {
  id: string;
  points: number;
  games: number;
  wins: number;
  loss: number;
  ties: number;
  goal_pro: number;
  goal_against: number;
  goal_difference: number;
  utilization: number;
  player: Player;
}

export interface Player {
  id: string;
  name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}
