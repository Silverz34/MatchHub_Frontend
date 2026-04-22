
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
  },

  getPlayerById: async (id: string) => {
    // Simulamos una consulta a la base de datos
    const players = await MatchService.getFeaturedPlayers();
    const player = players.find(p => p.id === id);

    if (!player) throw new Error("Jugador no encontrado");

    // Simulamos que la base de datos nos devuelve su disponibilidad completa
    return {
      ...player,
      bio: player.bio || "Buscando equipo para jugar y pasar el rato. Dispuesto a aprender y mejorar.",
      availability: {
        "Lunes": { active: true, start: "19:00", end: "23:00" },
        "Miércoles": { active: true, start: "18:00", end: "22:00" },
        "Sábado": { active: true, start: "14:00", end: "18:00" }
      }
    };
  }
};