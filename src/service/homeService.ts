import { ApiClient } from "@/lib/apiClient";
import { HomeStats, CompatiblePlayersResponse } from "@/interfaces/dashboard";

export const HomeService = {
  getStats: async (api: ApiClient): Promise<HomeStats> => {
    return await api.get<HomeStats>("/matches/stats");
  },

  getCompatiblePlayers: async (api: ApiClient, page = 1, limit = 6): Promise<CompatiblePlayersResponse> => {
    return await api.get<CompatiblePlayersResponse>(`/players/compatible?page=${page}&limit=${limit}`);
  }
};