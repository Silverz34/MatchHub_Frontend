
import { ApiClient } from "@/lib/apiClient";
import { Game, Preference, AvatarsResponse} from "../interfaces/interfaces"
import { Profile } from "@/interfaces/profile";

export const ProfileService = {

  getAvailableGames: async (api: ApiClient): Promise<Game[]> => {
    const response = await api.get<{ games: Game[] }>("/games");
    return response.games;
  },

  getAvailablePreferences: async (api: ApiClient): Promise<Preference[]> => {
    const response = await api.get<{ preferences: Preference[] }>("/preferences");
    return response.preferences;
  },

  getAvatars: async (api: ApiClient): Promise<AvatarsResponse> => {
    return await api.get<AvatarsResponse>("/profile/avatars");
  },

  updateProfile: async (api: ApiClient, payload: unknown) => {
    return await api.put("/profile", payload);
  },

  getProfile: async (api: ApiClient): Promise<Profile> => {
    return await api.get<Profile>("/profile");
  }
};