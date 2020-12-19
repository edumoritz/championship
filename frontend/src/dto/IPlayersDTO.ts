export interface IPlayerDTO {
  id: string;
  name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

export interface ICreateGameFormData {
  player1: string;
  player2: string;
  goals_player1: number;
  goals_player2: number;
}
