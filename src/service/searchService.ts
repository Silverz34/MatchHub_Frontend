import { ApiClient } from "@/lib/apiClient";
import { SearchFilters, SearchResponse } from "@/interfaces/searchService";

export const SearchService = {
  searchPlayers: async (api: ApiClient, filters: SearchFilters): Promise<SearchResponse> => {
   
    const params = new URLSearchParams();
    if (filters.query) params.append("search", filters.query);
    if (filters.region) params.append("region", filters.region);
    if (filters.estilo_juego) params.append("estilo_juego", filters.estilo_juego);
    params.append("page", (filters.page || 1).toString());

    return await api.get<SearchResponse>(`/players?${params.toString()}`);
  }
};