

export interface HomeStats {
  nuevas_conexiones: number;
  juegos_activos: number;
  dias_semana: number;
}

export interface CompatiblePlayer {
  id: number;
  username: string;     // En vez de "name"
  avatar_url: string;   // En vez de "avatar"
  descripcion?: string; // Opcional, por si la API la manda
  
  // Scores
  horario_score?: number;
  juego_score?: number;
  preferencia_score?: number;
  total_score: number;  // En vez de "matchPercent"
  
  // Datos visuales
  estilo_juego: string;
  region: string;
  plataformas: string[];
  is_online: boolean;
}

export interface CompatiblePlayersResponse {
  page: number;
  limit: number;
  players: CompatiblePlayer[];
}


