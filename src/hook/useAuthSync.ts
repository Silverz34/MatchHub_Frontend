
import { useEffect, useRef, useState } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createApiClient, ApiRequestError } from "@/lib/apiClient";
import { jugador } from "@/interfaces/player";

interface RegisterResponse {
  message: string;
  jugador: jugador;
  profileComplete: boolean;
}

interface MeResponse {
  jugador?: jugador;
  profileComplete: boolean;
  pendingRegister?: boolean;
  missingSteps?: string[];
  clerkUserId?: string;
}


export type SyncStatus =
  | "idle"        // Clerk todavía no cargó
  | "syncing"     // en proceso
  | "done"        // sincronizado y perfil completo
  | "incomplete"  // sincronizado pero perfil incompleto 
  | "error";      // falló algo inesperado



export function useAuthSync() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();

  const [status, setStatus] = useState<SyncStatus>("idle");
  const [jugador, setJugador] = useState<jugador | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hasSynced = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || hasSynced.current) return;

    let cancelled = false;

    async function syncWithBackend() {
      setStatus("syncing");

      try {
        const token = await getToken();
        const api = createApiClient(token);
        const registerPayload: { username?: string } = {};
        if (user?.username) {
          registerPayload.username = user.username;
        }

        let registerData: RegisterResponse;
        try {
          registerData = await api.post<RegisterResponse>(
            "/auth/register",
            registerPayload
          );
        } catch (err) {
          // 409 = ya registrado, continuamos con /me
          if (err instanceof ApiRequestError && err.status === 409) {
            registerData = { message: "", jugador: null!, profileComplete: false };
          } else {
            throw err;
          }
        }

        if (cancelled) return;

        const meData = await api.get<MeResponse>("/auth/me");

        if (cancelled) return;

        hasSynced.current = true;

        if (meData.jugador) {
          setJugador(meData.jugador);
        }

        if (!meData.profileComplete) {
          setStatus("incomplete");
          router.replace("/perfil");
        } else {
          setStatus("done");
          if (registerData.jugador && !registerData.profileComplete) {
            router.replace("/inicio");
          }
        }
      } catch (err) {
        if (cancelled) return;
        hasSynced.current = false; // permitir reintento
        const message =
          err instanceof ApiRequestError
            ? err.body.error
            : "Error al conectar con el servidor.";
        setError(message);
        setStatus("error");
        console.error("[useAuthSync]", err);
      }
    }

    syncWithBackend();

    return () => {
      cancelled = true;
    };
 
  }, [isLoaded, isSignedIn]);

  return { status, jugador, error };
}