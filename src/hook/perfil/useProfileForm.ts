import { useState } from "react";
import { useRouter } from "next/navigation";
import { ApiClient } from "@/lib/apiClient";
import { ProfileService } from "@/service/profile";
import { DAYS_LIST } from "@/utils/modojuego";

export function useProfileForm(getClient: () => Promise<ApiClient>) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  // Estados del usuario
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const [selectedGames, setSelectedGames] = useState<number[]>([]);
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([]);
  
  const [bio, setBio] = useState("");
  const [discord, setDiscord] = useState("");
  const [platform, setPlatform] = useState("");
  
  // NUEVO: Estados adaptados a tu base de datos (ENUMs)
  const [region, setRegion] = useState<"norte" | "centro" | "sur">("centro");
  const [estiloJuego, setEstiloJuego] = useState<"casual" | "competitivo">("casual");

  // Disponibilidad
  const [availability, setAvailability] = useState<Record<string, { active: boolean; start: string; end: string }>>(
    DAYS_LIST.reduce((acc, day) => ({ ...acc, [day]: { active: false, start: "", end: "" } }), {})
  );

  // Funciones Toggle
  const toggleGame = (id: number) => setSelectedGames(p => p.includes(id) ? p.filter(g => g !== id) : [...p, id]);
  const togglePreference = (id: number) => setSelectedPrefs(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleDay = (day: string) => setAvailability(p => ({ ...p, [day]: { ...p[day], active: !p[day].active } }));
  const updateTime = (day: string, field: "start"|"end", value: string) => setAvailability(p => ({ ...p, [day]: { ...p[day], [field]: value } }));

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

      // Payload estricto según tu DB
      const payload = {
        avatar_url: selectedAvatar,
        videojuego_ids: selectedGames,
        preferencia_ids: selectedPrefs,
        descripcion: bio,
        discord_id: discord,
        plataformas: platform ? platform.split(',').map(p => p.trim().toLowerCase()) : [], 
        region: region,
        estilo_juego: estiloJuego, 
        disponibilidad: disponibilidadArray
      };

      await ProfileService.updateProfile(api, payload);
      router.push("/inicio");
    } catch (error) {
      console.error("Error al guardar:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    selectedAvatar, setSelectedAvatar,
    selectedGames, toggleGame,
    selectedPrefs, togglePreference,
    bio, setBio, discord, setDiscord, platform, setPlatform,
    region, setRegion, estiloJuego, setEstiloJuego,
    availability, toggleDay, updateTime,
    isSaving, handleSave, router
  };
}