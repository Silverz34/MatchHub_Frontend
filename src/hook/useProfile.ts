// src/hooks/useProfile.ts
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProfileService } from "@/service/service";
import { Avatar } from "@/interfaces/avatar";
import { Profile } from "@/interfaces/profile";


export function useProfile() {
  const router = useRouter();
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [availableGames, setAvailableGames] = useState<string[]>([]);
  
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const catalog = ProfileService.getAvatarCatalog();
        const games = await ProfileService.getAvailableGames();
        
        setAvatars(catalog);
        setAvailableGames(games);
        setSelectedAvatar(catalog[0]?.url || ""); 
      } catch (error) {
        console.error("Error cargando catálogos", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const toggleGame = (juego: string) => {
    if (selectedGames.includes(juego)) {
      setSelectedGames(selectedGames.filter(g => g !== juego));
    } else {
      setSelectedGames([...selectedGames, juego]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const payload: Profile = {
        avatarUrl: selectedAvatar,
        games: selectedGames.join(', '),
      };

      await ProfileService.updateProfile(payload);
      
      router.push("/inicio");
    } catch (error) {
      console.error("Falló el guardado", error);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    avatars,
    availableGames,
    selectedAvatar,
    setSelectedAvatar,
    selectedGames,
    toggleGame,
    isLoading,
    isSaving,
    handleSave
  };
}