import { useState, useEffect } from "react";
import { ApiClient } from "@/lib/apiClient";
import { ProfileService } from "@/service/profile";
import { Game, Preference, AvatarOption } from "../../interfaces/interfaces";

export function useProfileCatalogs(getClient: () => Promise<ApiClient>) {
  const [avatars, setAvatars] = useState<AvatarOption[]>([]);
  const [availableGames, setAvailableGames] = useState<Game[]>([]);
  const [availablePrefs, setAvailablePrefs] = useState<Preference[]>([]);
  const [isLoadingCatalogs, setIsLoadingCatalogs] = useState(true);

  useEffect(() => {
    async function fetchCatalogs() {
      try {
        const api = await getClient();
        const [gamesData, prefsData, avatarData] = await Promise.all([
          ProfileService.getAvailableGames(api),
          ProfileService.getAvailablePreferences(api),
          ProfileService.getAvatars(api)
        ]);

        setAvailableGames(gamesData);
        setAvailablePrefs(prefsData);
        setAvatars(avatarData.avatars);
      } catch (error) {
        console.error("Error al cargar catálogos:", error);
      } finally {
        setIsLoadingCatalogs(false);
      }
    }
    fetchCatalogs();
  }, [getClient]);

  return { avatars, availableGames, availablePrefs, isLoadingCatalogs };
}