import { useState, useEffect, useCallback } from "react";
import { useApi } from "@/lib/apiClient";
import { SearchService } from "@/service/searchService";
import { ProfileService } from "@/service/profile";
import { CompatiblePlayer } from "@/interfaces/dashboard";

export function useSearch() {
  const { getClient } = useApi();

  const [players, setPlayers] = useState<CompatiblePlayer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [availableGames, setAvailableGames] = useState<string[]>([]);
  const [isLoadingGames, setIsLoadingGames] = useState(true);
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  useEffect(() => {
    async function fetchGames() {
      try {
        const api = await getClient();
        const games = await ProfileService.getAvailableGames(api);
        setAvailableGames(games.map(g => g.nombre));
      } catch (error) {
        console.error("Error cargando juegos:", error);
      } finally {
        setIsLoadingGames(false);
      }
    }
    fetchGames();
  }, [getClient]);

  const fetchPlayers = useCallback(async () => {
    setIsLoading(true);
    try {
      const api = await getClient();
      
      // Armamos los filtros para el backend (convertimos los arreglos a strings separados por coma si la API lo pide así)
      const response = await SearchService.searchPlayers(api, {
        query: searchQuery,

        estilo_juego: selectedStyles.length > 0 ? selectedStyles[0].toLowerCase() : undefined,
        page: 1
      });
      
      setPlayers(response.players);
    } catch (error) {
      console.error("Error buscando jugadores:", error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedGames, selectedStyles, selectedDays, getClient]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPlayers();
    }, 300); 

    return () => clearTimeout(delayDebounceFn);
  }, [fetchPlayers]);

  const toggleFilter = (filter: string, type: 'game' | 'style' | 'day') => {
    if (type === 'game') {
      setSelectedGames(prev => prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]);
    } else if (type === 'style') {
      setSelectedStyles(prev => prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]);
    } else if (type === 'day') {
      setSelectedDays(prev => prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]);
    }
  };

  return {
    searchQuery, setSearchQuery,
    players, isLoading,
    availableGames, isLoadingGames, 
    selectedGames, selectedStyles, selectedDays,
    toggleFilter
  };
}