"use client";

import { useAuthSync } from "@/hook/useAuthSync";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { status, error } = useAuthSync();

  // Mientras sincronizamos, bloqueamos el render del contenido
  if (status === "idle" || status === "syncing") {
    return (
      <div className="min-h-screen bg-[#0F0F11] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#00C2FF]" size={48} />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-[#0F0F11] flex flex-col items-center justify-center gap-4 text-white">
        <p className="text-red-400 font-semibold">
          {error ?? "Error al conectar con el servidor."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-[#FF6B00] rounded-lg text-sm font-bold hover:opacity-90 transition-opacity"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (status === "incomplete") {
    return (
      <div className="min-h-screen bg-[#0F0F11] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#FF6B00]" size={48} />
      </div>
    );
  }
  return <>{children}</>;
}