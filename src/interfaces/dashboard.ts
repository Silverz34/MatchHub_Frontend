

export interface HomeStats {
  nuevas_conexiones: number;
  juegos_activos: number;
  dias_semana: number;
}

export interface CompatiblePlayer {
  id: number;
  username: string;
  avatar_url: string;
  horario_score: number;
  juego_score: number;
  preferencia_score: number;
  total_score: number;
}

export interface CompatiblePlayersResponse {
  page: number;
  limit: number;
  players: CompatiblePlayer[];
}