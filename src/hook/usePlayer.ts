// src/hooks/usePlayerProfile.ts
import { useState, useEffect } from "react";
import { MatchService } from "@/utils/datosRandom";

export function usePlayerProfile(playerId: string) {
  const [player, setPlayer] = useState<Record<string, unknown> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    async function fetchPlayer() {
      try {
        const data = await MatchService.getPlayerById(playerId);
        setPlayer(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (playerId) fetchPlayer();
  }, [playerId]);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulamos el envío de la solicitud a tu backend
    setTimeout(() => {
      setIsConnecting(false);
      setRequestSent(true);
    }, 1000);
  };

  return { player, isLoading, isConnecting, requestSent, handleConnect };
}