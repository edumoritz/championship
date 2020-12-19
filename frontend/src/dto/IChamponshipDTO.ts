export interface IChampionshipResponse {
  name: string;
  chips: PlayerDTO[];
}

export interface PlayerDTO {
  id: string;
  name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}
