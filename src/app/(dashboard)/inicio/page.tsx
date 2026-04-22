"use client";

import { useUser } from "@clerk/nextjs";
import { Sparkles, Gamepad2, Clock, Lightbulb, Loader2 } from "lucide-react";
import PlayerCard from "@/components/playercard";
import { useHome } from "@/hook/usehome";

export default function InicioPage() {
  const { user } = useUser();
  const { players, isLoading } = useHome();
  const displayName = user?.username || user?.firstName || "Jugador";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F0F11] flex items-center justify-center text-white">
        <Loader2 className="animate-spin text-[#00C2FF]" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F11] text-white p-6 md:p-10">
      
      {/* Header de Bienvenida */}
      <header className="flex justify-between items-end mb-10 pt-10">
            <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">
                Hola, { displayName || "ProGamer"}
            </h1>
            <p className="text-gray-400">Estos jugadores podrían ser tu próximo squad</p>
            </div>
            <button className="bg-[#00C2FF] hover:bg-[#00A3D9] text-black font-bold py-2.5 px-6 rounded-full text-sm transition-all shadow-[0_0_20px_rgba(0,194,224,0.3)]">
            Buscar más
            </button>
      </header>

      {/* Sección de Estadísticas Rápidas */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <div className="bg-[#161618] border-2 border-[#00C2FF] rounded-3xl p-8 relative overflow-hidden group flex flex-col justify-between h-full shadow-[0_0_15px_rgba(0,194,224,0.15)]">
                <div className="relative z-10">
                <h2 className="text-7xl font-black text-[#00C2FF] mb-2 tracking-tighter">6</h2>
                <h3 className="text-xl font-bold mb-1">Nuevas conexiones</h3>
                <p className="text-gray-500 text-sm">Jugadores que matchean contigo</p>
                <div className="w-full bg-[#2A2A2D] h-2 rounded-full mt-8">
                    <div className="bg-[#00C2FF] h-full w-[65%] rounded-full shadow-[0_0_10px_#00C2FF]"></div>
                </div>
                </div>
                <Sparkles className="absolute top-8 right-8 text-[#00C2FF]" size={36} />
            </div>

            <div className="flex flex-col gap-6">
        
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <div className="bg-[#161618] border border-[#2A2A2D] rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden">
                    {/* Borde izquierdo de color simulado */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF6B00]"></div>
                    <Gamepad2 className="text-[#FF6B00] mb-4" size={24} />
                    <div className="text-3xl font-black tracking-tighter mb-1">2</div>
                    <div className="text-gray-400 text-sm">Juegos activos</div>
                </div>

                <div className="bg-[#161618] border border-[#2A2A2D] rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden">
                    {/* Borde izquierdo de color simulado */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#eab308]"></div>
                    <Clock className="text-[#eab308] mb-4" size={24} />
                    <div className="text-3xl font-black tracking-tighter mb-1">2</div>
                    <div className="text-gray-400 text-sm">Días a la semana</div>
                </div>
                
                </div>
                <div className="flex-1 bg-[#161618] border border-dashed border-[#FF6B00]/60 rounded-3xl p-6 flex items-center gap-3">
                    <Lightbulb className="text-[#FF6B00]" size={20} />
                    <p className="text-gray-300 text-sm">
                        <span className="text-[#FF6B00] font-bold mr-1">Tip:</span> 
                        Completa tu perfil para mejores matches
                    </p>
                </div>

            </div>
        </section>

      {/* Título de la Cuadrícula */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold inline-block border-b-4 border-[#FF6B00] pb-2">
          Jugadores destacados
        </h2>
      </div>

      {/* Cuadrícula de Jugadores */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {players.map((player, index) => (
          <PlayerCard 
            key={player.id} 
            player={player} 
            isFeatured={index === 0} // El primer jugador siempre es el destacado (grande)
          />
        ))}
      </section>
      
    </div>
  );
}