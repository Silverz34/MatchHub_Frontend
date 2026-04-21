
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProfileService } from "@/service/service";
import { Avatar } from "@/interfaces/avatar";
import { Profile } from "@/interfaces/profile";

export const PREFERENCES_LIST = [
  "Competitivo", "Casual", "Comunicativo", "Estratégico",
  "Agresivo", "Defensivo", "Flexible", "Paciente",
  "Serio", "Divertido", "Nocturno", "Social"
];

export const DAYS_LIST = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export function useProfile() {
  const router = useRouter();
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [availableGames, setAvailableGames] = useState<string[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [bio, setBio] = useState("");
  const [discord, setDiscord] = useState("");
  const [platform, setPlatform] = useState("");
  const [region, setRegion] = useState("");
  

  const [preferences, setPreferences] = useState<string[]>([]);

  const [availability, setAvailability] = useState<Record<string, { active: boolean; start: string; end: string }>>(
    DAYS_LIST.reduce((acc, day) => ({ ...acc, [day]: { active: false, start: "", end: "" } }), {})
  );


  const [customGame, setCustomGame] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setAvatars(ProfileService.getAvatarCatalog());
        setAvailableGames(await ProfileService.getAvailableGames());
        setSelectedAvatar(ProfileService.getAvatarCatalog()[0]?.url || ""); 
      } catch (error) {
        console.error("Error", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const toggleGame = (juego: string) => {
    setSelectedGames(prev => prev.includes(juego) ? prev.filter(g => g !== juego) : [...prev, juego]);
  };

  const addCustomGame = () => {
    if (customGame.trim() && !selectedGames.includes(customGame)) {
      setSelectedGames([...selectedGames, customGame.trim()]);
      setCustomGame(""); // Limpiamos el input
    }
  };

  const togglePreference = (pref: string) => {
    setPreferences(prev => prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]);
  };

  const toggleDay = (day: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: { ...prev[day], active: !prev[day].active }
    }));
  };

  const updateTime = (day: string, field: "start" | "end", value: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const payload: Profile= {
        avatarUrl: selectedAvatar,
        games: selectedGames,
        bio, discord, platform, region, preferences, availability
      };
      await ProfileService.updateProfile(payload);
      router.push("/inicio");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    avatars, availableGames, selectedAvatar, setSelectedAvatar,
    selectedGames, toggleGame, customGame, setCustomGame, addCustomGame,
    bio, setBio, discord, setDiscord, platform, setPlatform, region, setRegion,
    preferences, togglePreference, availability, toggleDay, updateTime,
    isLoading, isSaving, handleSave, router
  };
}