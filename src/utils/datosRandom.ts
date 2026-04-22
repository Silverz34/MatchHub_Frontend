// src/services/match.service.ts
import { Players } from "@/interfaces/player";

export const MatchService = {
  getFeaturedPlayers: async (): Promise<Players[]> => {
    // Simulamos una llamada a tu API de Matchmaking
    return [
      {
        id: "1",
        name: "ShadowNinja",
        avatar: "🥷",
        matchPercent: 95,
        games: ["Valorant", "CS:GO", "Apex Legends"],
        preferences: ["Competitivo", "Comunicativo", "Estratégico"],
        bio: "Main Jett/Reyna. Buscando equipo para torneos. Tengo experiencia en ligas amateur."
      },
      {
        id: "2",
        name: "MysticMage",
        avatar: "🧙‍♀️",
        matchPercent: 88,
        games: ["League of Legends", "Dota 2"],
        preferences: ["Casual", "Amigable"]
      },
      {
        id: "3",
        name: "DragonSlayer",
        avatar: "🐲",
        matchPercent: 92,
        games: ["Valorant", "Rainbow Six Siege"],
        preferences: ["Competitivo", "Serio"]
      },
      {
        id: "4",
        name: "PhoenixRising",
        avatar: "🔥",
        matchPercent: 85,
        games: ["League of Legends", "TFT"],
        preferences: ["Competitivo", "Flexible"]
      },
      {
        id: "5",
        name: "IceQueen",
        avatar: "❄️",
        matchPercent: 78,
        games: ["Valorant", "Overwatch 2"],
        preferences: ["Casual", "Divertido"]
      }
    ];
  }
};