
import { useState, useEffect } from "react";
import { MatchService } from "@/utils/datosRandom";
import { Players } from "@/interfaces/player";

export function useHome() {
  const [players, setPlayers] = useState<Players[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const featured = await MatchService.getFeaturedPlayers();
        setPlayers(featured);
      } finally {
        setIsLoading(false);
      }
    }
    loadHomeData();
  }, []);

  return { players, isLoading };
}