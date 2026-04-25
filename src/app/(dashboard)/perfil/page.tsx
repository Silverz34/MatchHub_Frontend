"use client";
import { useViewProfile } from "@/hook/perfil/useViewProfile";
import { Loader2, Edit3, Gamepad2, Calendar} from "lucide-react";
import Link from "next/link";

export default function PerfilViewPage() {
  const { profile, isLoading } = useViewProfile();

  if (isLoading) {
    return <div className="min-h-screen bg-[#0F0F11] flex items-center justify-center"><Loader2 className="animate-spin text-[#00C2FF]" size={48} /></div>;
  }

  if (!profile) return null;
  const coverImage = "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-[#0F0F11] text-white pb-20">

      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        {/* Imagen con Overlay para que no brille de más */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${coverImage})` }}
        >
          <div className="absolute inset-0 bg-lineart-to-t from-[#0F0F11] via-transparent to-black/40"></div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-10">
        <div className="bg-[#161618] border border-[#2A2A2D] rounded-3xl p-8 shadow-2xl">
          {/* Cabecera: Avatar e Info Básica */}
          <div className="flex flex-col md:flex-row gap-8 items-start border-b border-[#2A2A2D] pb-8 mb-8">
            
            <img src={profile.avatar_url} alt="Avatar" className="w-32 h-32 rounded-2xl border-2 border-[#00C2FF] p-2 bg-[#0F0F11]" />

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-black">{profile.username}</h1>
                {profile.is_online && <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>}
              </div>
              <p className="text-gray-400 mb-4">{profile.email}</p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-[#FF6B00]/10 text-[#FF6B00] px-3 py-1 rounded-full text-xs font-bold uppercase border border-[#FF6B00]/20">
                  {profile.estilo_juego}
                </span>
                <span className="bg-[#00C2FF]/10 text-[#00C2FF] px-3 py-1 rounded-full text-xs font-bold uppercase border border-[#00C2FF]/20">
                  {profile.region}
                </span>
              </div>
            </div>
            <div className="max-w-5xl mx-auto h-full relative px-6">
              <Link 
                href="/perfil/editar" 
                className="top-8 right-6 bg-[#0F0F11]/60 hover:bg-[#FF6B00] 
                backdrop-blur-md border border-white/10 px-10 py-2.5 rounded-xl flex items-center gap-2 transition-all font-bold group shadow-lg"
              >
                <Edit3 size={18} className="group-hover:scale-110 transition-transform" /> 
                <span>Editar Perfil</span>
              </Link>
           </div>
         </div>

          {/* Biografía */}
          <div className="mb-10">
            <h4 className="text-gray-500 uppercase text-xs font-black mb-3 tracking-widest">Biografía</h4>
            <p className="text-lg text-gray-200 leading-relaxed italic">
              {profile.descripcion || "Este jugador prefiere mantener el misterio..."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Juegos */}
            <div>
              <h4 className="flex items-center gap-2 text-[#00C2FF] font-bold mb-4">
                <Gamepad2 size={20} /> Juegos Favoritos
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.juegos.map(juego => (
                  <span key={juego.id} className="bg-[#0F0F11] border border-[#2A2A2D] px-4 py-2 rounded-lg text-sm">
                    {juego.nombre}
                  </span>
                ))}
              </div>
            </div>

            {/* Disponibilidad */}
            <div>
              <h4 className="flex items-center gap-2 text-[#eab308] font-bold mb-4">
                <Calendar size={20} /> Horarios Activos
              </h4>
              <div className="space-y-2">
                {profile.disponibilidad.map(slot => (
                  <div key={slot.dia_semana} className="flex justify-between 
                   text-sm bg-[#0F0F11] p-2 rounded-lg border border-[#2A2A2D]">
                    <span className="font-bold text-gray-400">
                      {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"][slot.dia_semana]}
                    </span>
                    <span>{slot.hora_inicio} - {slot.hora_fin}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preferencias / Tags */}
          <div className="mt-10 pt-8 border-t border-[#2A2A2D]">
            <h4 className="text-gray-500 uppercase text-xs font-black mb-4 tracking-widest">Etiquetas de Estilo</h4>
            <div className="flex flex-wrap gap-2">
              {profile.preferencias.map(pref => (
                <span key={pref.id} className="bg-[#FF6B00] text-white px-3 py-1 rounded-lg text-xs font-bold">
                  {pref.nombre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}