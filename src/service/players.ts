import { ApiClient } from "@/lib/apiClient";
import { CompatiblePlayer } from "@/interfaces/compatiblePlayers";
import { FilteredPlayer } from "@/interfaces/filterPlayers";

export interface PlayerProfile {
  player: {
    id: number;
    username: string;
    avatar_url: string;
    descripcion: string | null;
    estilo_juego: string;
    region: string;
    plataformas: string[];
    is_online: boolean;
    discord_id: string | null;
  };
  juegos: { id: number; nombre: string }[];
  preferencias: { id: number; nombre: string }[];
  disponibilidad: { dia_semana: number; hora_inicio: string; hora_fin: string }[];
  compatibilidad: {
    horario_score: string;
    juego_score: string;
    preferencia_score: string;
    total: number;
  } | null;
}

export interface DashboardStats {
  nuevas_conexiones: number;
  juegos_activos: number;
  dias_semana: number;
}


export interface PlayerCard {
  id: string;
  name: string;
  avatar: string;         
  matchPercent: number;
  games: string[];
  preferences: string[];
  bio?: string;
  isOnline?: boolean;
}


export function mapCompatibleToCard(p: CompatiblePlayer): PlayerCard {
  return {
    id: String(p.id),
    name: p.username,
    avatar: p.avatar_url,
    matchPercent: Math.round(p.total_score),
    games: [],        
    preferences: [],
  };
}

export function mapFilteredToCard(p: FilteredPlayer): PlayerCard {
  return {
    id: String(p.id),
    name: p.username,
    avatar: p.avatar_url,
    matchPercent: 0,
    games: p.plataformas,
    preferences: [p.estilo_juego],
    isOnline: p.is_online,
  };
}

export const PlayersService = {
  getCompatible: async (api: ApiClient, page = 1, limit = 20): Promise<PlayerCard[]> => {
    const res = await api.get<{ players: CompatiblePlayer[] }>(
      `/players/compatible?page=${page}&limit=${limit}`
    );
    return res.players.map(mapCompatibleToCard);
  },

  getFiltered: async (
    api: ApiClient,
    filters: {
      region?: string;
      estilo_juego?: string;
      plataforma?: string;
      videojuego_id?: number;
      page?: number;
      limit?: number;
    } = {}
  ): Promise<PlayerCard[]> => {
    const params = new URLSearchParams();
    if (filters.region)        params.set("region",        filters.region);
    if (filters.estilo_juego)  params.set("estilo_juego",  filters.estilo_juego);
    if (filters.plataforma)    params.set("plataforma",    filters.plataforma);
    if (filters.videojuego_id) params.set("videojuego_id", String(filters.videojuego_id));
    params.set("page",  String(filters.page  ?? 1));
    params.set("limit", String(filters.limit ?? 20));

    const res = await api.get<{ players: FilteredPlayer[] }>(`/players?${params.toString()}`);
    return res.players.map(mapFilteredToCard);
  },

  getProfile: async (api: ApiClient, playerId: number): Promise<PlayerProfile> => {
    return api.get<PlayerProfile>(`/players/${playerId}`);
  },

  getDashboardStats: async (api: ApiClient): Promise<DashboardStats> => {
    return api.get<DashboardStats>("/matches/stats");
  },
};