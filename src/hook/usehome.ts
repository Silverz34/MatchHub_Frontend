import { useState, useEffect } from "react";
import { useApi } from "@/lib/apiClient";
import { HomeService } from "@/service/homeService";
import { HomeStats, CompatiblePlayer} from "@/interfaces/dashboard";


export function useHome() {
  const { getClient } = useApi();
  
  const [stats, setStats] = useState<HomeStats | null>(null);
  const [players, setPlayers] = useState<CompatiblePlayer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const api = await getClient();
        
        // Ejecutamos ambas peticiones en paralelo
        const [statsData, playersData] = await Promise.all([
          HomeService.getStats(api),
          HomeService.getCompatiblePlayers(api, 1, 6) 
        ]);

        setStats(statsData);
        setPlayers(playersData.players);
      } catch (err) {
        console.error("Error cargando el dashboard:", err);
        setError("Hubo un problema al cargar los jugadores compatibles.");
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboard();
  }, [getClient]);

  return { stats, players, isLoading, error };
}