import { useEffect } from "react";
import { useApi } from "@/lib/apiClient";
import { useProfileCatalogs } from "./useProfileCatalogo";
import { useProfileForm } from "./useProfileForm";

export function useProfile() {
  const { getClient } = useApi();
  
  // Traemos los catálogos
  const catalogs = useProfileCatalogs(getClient);
  
  // Traemos la lógica del formulario
  const form = useProfileForm(getClient);

  // Autoseleccionar el primer avatar cuando carguen
 useEffect(() => {
    if (catalogs.avatars.length > 0 && !form.selectedAvatar) {
      form.setSelectedAvatar(catalogs.avatars[0].url);
    }
  }, [catalogs.avatars, form.selectedAvatar, form.setSelectedAvatar]);
  
  return {
    ...catalogs,
    ...form,
    isLoading: catalogs.isLoadingCatalogs
  };
}