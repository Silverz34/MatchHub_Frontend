import { useState, useEffect } from "react";
import { useApi } from "@/lib/apiClient";
import { ProfileService } from "@/service/profile";
import { ProfileResponse } from "@/interfaces/profileMe";

export function useViewProfile() {
  const { getClient } = useApi();
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const api = await getClient();
        const data = await ProfileService.getProfile(api);
        setProfile(data);
      } catch (error) {
        console.error("Error al cargar perfil:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProfile();
  }, [getClient]);

  return { profile, isLoading };
}