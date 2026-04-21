import { Avatar, Juego} from "@/interfaces/avatar";
import { Profile } from "@/interfaces/profile";

const DICEBEAR_BASE_URL = "https://api.dicebear.com/7.x/bottts/svg?seed=";
const RAWG_API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;


export interface UpdateProfileResponse {
  success: boolean;
  message: string;
}

export const ProfileService = {
  
  // Catálogo de Avatares (DiceBear)
  // Tipamos el retorno como un arreglo de Avatares (Avatar[])
  getAvatarCatalog: (): Avatar[] => {
    const seeds = ["shadow", "ninja", "dragon", "phoenix", "mage", "strike", "viper", "ghost", "titan", "nova", "apex", "echo"];
    
    return seeds.map(seed => ({
      id: seed,
      url: `${DICEBEAR_BASE_URL}${seed}`
    }));
  },

  // Catálogo de Juegos (RAWG API)
  // Tipamos el retorno como una Promesa que resuelve en un arreglo de strings
  getAvailableGames: async (): Promise<string[]> => {
    try {
      const response = await fetch(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page_size=24`);
      
      if (!response.ok) throw new Error("Fallo en la respuesta de RAWG");
      
      const data = await response.json();

      const gameNames: string[] = data.results.map((game: Juego) => game.name);
      return gameNames;

    } catch (error) {
      console.error("Error al obtener juegos de RAWG:", error);
      return ["Valorant", "League of Legends", "CS:GO", "Apex Legends", "Minecraft", "Fortnite"];
    }
  },

  updateProfile: async (profileData: Profile): Promise<UpdateProfileResponse> => {
    console.log("Enviando payload a la base de datos:", profileData);
    
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, message: "Perfil guardado" }), 1500);
    });
  }
};