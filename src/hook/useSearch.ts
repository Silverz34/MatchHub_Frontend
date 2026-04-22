
import { useState, useEffect } from "react";
import { MatchService } from "@/utils/datosRandom";
import { ProfileService } from "@/service/service";
import { Players } from "@/interfaces/player";

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [players, setPlayers] = useState<Players[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [availableGames, setAvailableGames] = useState<string[]>([]);

  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  useEffect(() => {
    async function fetchSearchData() {
      setIsLoading(true);
      try {

        const [playersData, gamesData] = await Promise.all([
          MatchService.getFeaturedPlayers(),
          ProfileService.getAvailableGames() 
        ]);

        const playersWithBio = playersData.map(p => ({
          ...p,
          bio: p.bio || `Jugador enfocado en dar lo mejor. Buscando hacer match para subir de rango y mejorar la sinergia en equipo.`
        }));

        setPlayers(playersWithBio);
        setAvailableGames(gamesData); 
        
      } catch (error) {
        console.error("Error cargando datos de búsqueda", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchSearchData();
  }, []);

  const toggleFilter = (filter: string, type: 'game' | 'style') => {
    if (type === 'game') {
      setSelectedGames(prev => prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]);
    } else {
      setSelectedStyles(prev => prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]);
    }
  };

  return { 
    searchQuery, setSearchQuery, 
    players, isLoading,
    availableGames, 
    selectedGames, selectedStyles, toggleFilter
  };
}