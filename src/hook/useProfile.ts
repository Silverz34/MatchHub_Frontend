import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/lib/apiClient";
import { ProfileService } from "@/service/profile";
import { Game, Preference, AvatarOption } from "../interfaces/interfaces";

// Usamos tu lista de días para inicializar el estado
const DAYS_LIST = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export function useProfile() {
  const router = useRouter();
  const { getClient } = useApi();

  const [avatars, setAvatars] = useState<AvatarOption[]>([]);
  const [availableGames, setAvailableGames] = useState<Game[]>([]);
  const [availablePrefs, setAvailablePrefs] = useState<Preference[]>([]);
  
  // Estados de Selección (IDs)
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const [selectedGames, setSelectedGames] = useState<number[]>([]);
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([]);
  
  // Estados de Texto
  const [bio, setBio] = useState("");
  const [discord, setDiscord] = useState("");
  const [platform, setPlatform] = useState("");
  const [region, setRegion] = useState("");
  const [customGame, setCustomGame] = useState("");

  //Estado de Disponibilidad (Diccionario)
  const [availability, setAvailability] = useState<Record<string, { active: boolean; start: string; end: string }>>(
    DAYS_LIST.reduce((acc, day) => ({ ...acc, [day]: { active: false, start: "", end: "" } }), {})
  );

  //Estados de Carga
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Cargar datos iniciales
  useEffect(() => {
    async function loadData() {
      try {
        const api = await getClient();
        
        const [games, prefs, avatarData] = await Promise.all([
          ProfileService.getAvailableGames(api),
          ProfileService.getAvailablePreferences(api),
          ProfileService.getAvatars(api)
        ]);

        setAvailableGames(games);
        setAvailablePrefs(prefs);
        setAvatars(avatarData.avatars);
        
        if (avatarData.avatars.length > 0) {
          setSelectedAvatar(avatarData.avatars[0].url);
        }
      } catch (error) {
        console.error("Error al sincronizar catálogos:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [getClient]);

  // Manejadores de Toggles
  const toggleGame = (id: number) => {
    setSelectedGames(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const togglePreference = (id: number) => {
    setSelectedPrefs(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  // Agregar juego personalizado 
  const addCustomGame = () => {
    if (customGame.trim() !== "") {
      const tempId = Date.now(); // Creamos un ID temporal numérico
      const newGame: Game = {
        id: tempId,
        nombre: customGame.trim(),
        plataformas: [],
        origen: "custom"
      };
      setAvailableGames(prev => [...prev, newGame]);
      setSelectedGames(prev => [...prev, tempId]);
      setCustomGame("");
    }
  };

  // Manejadores de Disponibilidad
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

  // Función Principal de Guardado
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const api = await getClient();
      const mapDiasNombres = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
      
      const disponibilidadArray = Object.entries(availability)
        .filter(([_, data]) => data.active)
        .map(([dia, data]) => ({
          dia_semana: mapDiasNombres.indexOf(dia),
          hora_inicio: data.start,
          hora_fin: data.end
        }));

      // Armamos el payload exacto para la API
      const payload = {
        avatar_url: selectedAvatar,
        videojuego_ids: selectedGames,
        preferencia_ids: selectedPrefs,
        descripcion: bio,
        discord_id: discord,
        plataformas: platform ? [platform.toLowerCase()] : [], 
        region: region.toLowerCase(),
        disponibilidad: disponibilidadArray
      };

      await ProfileService.updateProfile(api, payload);
      
      router.push("/inicio");
    } catch (error) {
      console.error("Error al guardar el perfil:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    avatars,
    availableGames,
    availablePrefs,
    selectedAvatar, setSelectedAvatar,
    selectedGames, toggleGame,
    customGame, setCustomGame, addCustomGame,
    bio, setBio, 
    discord, setDiscord, 
    platform, setPlatform, 
    region, setRegion,
    selectedPrefs, togglePreference, 
    availability, toggleDay, updateTime,
    isLoading, isSaving, handleSave, router
  };
}