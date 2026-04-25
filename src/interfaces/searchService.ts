import { CompatiblePlayer } from "./dashboard";

export interface SearchFilters {
  query?: string;
  region?: string;
  estilo_juego?: string;
  page?: number;
}

export interface SearchResponse {
  page: number;
  limit: number;
  total: number;
  players: CompatiblePlayer[]; 
}
