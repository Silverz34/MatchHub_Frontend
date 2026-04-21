"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Search, Bell, User, LogOut } from "lucide-react";
// Si usas Next/Router para redirigir al home tras guardar
import { useRouter } from "next/navigation";

// Generamos unos "seeds" para DiceBear
const avatarSeeds = ["shadow", "ninja", "dragon", "phoenix", "mage", "strike", "viper", "ghost", "titan", "nova", "apex", "echo"];
const juegosDisponibles = ["Valorant", "League of Legends", "CS:GO", "Apex Legends", "Minecraft", "Fortnite"];

export default function PerfilPage() {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState(`https://api.dicebear.com/7.x/bottts/svg?seed=${avatarSeeds[0]}`);
  const [selectedGames, setSelectedGames] = useState<string[]>(["Valorant", "League of Legends"]);

  const toggleGame = (juego: string) => {
    if (selectedGames.includes(juego)) {
      setSelectedGames(selectedGames.filter(g => g !== juego));
    } else {
      setSelectedGames([...selectedGames, juego]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí irá tu lógica para guardar en la Base de Datos
    console.log("Guardando perfil...", { selectedAvatar, selectedGames });
    // Al terminar, enviamos al usuario al Home
    router.push("/inicio");
  };

  return (
    <div className="min-h-screen bg-[#0F0F11] text-white font-sans pb-12">
      
      {/* 1. NAVBAR (Fijo en la parte superior) */}
      <nav className="sticky top-0 z-50 bg-[#0F0F11]/90 backdrop-blur-md border-b border-[#2A2A2D] px-6 py-4 flex items-center justify-between">
        <div className="font-bold text-xl tracking-wide flex items-center gap-2">
          <div className="text-[#00C2FF] font-mono">M</div>
          MatchHub
        </div>
        
        <div className="flex gap-6 text-sm font-medium text-gray-400">
          <Link href="/inicio" className="flex items-center gap-2 hover:text-white transition-colors">
            <Home size={16} /> Inicio
          </Link>
          <Link href="/buscar" className="flex items-center gap-2 hover:text-white transition-colors">
            <Search size={16} /> Buscar
          </Link>
          <Link href="/solicitudes" className="flex items-center gap-2 hover:text-white transition-colors">
            <Bell size={16} /> Solicitudes
          </Link>
          {/* Botón activo */}
          <Link href="/perfil" className="flex items-center gap-2 text-white bg-[#00C2FF]/20 px-4 py-2 rounded-full border border-[#00C2FF]/50">
            <User size={16} className="text-[#00C2FF]" /> Perfil
          </Link>
        </div>

        <button className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors text-sm font-medium">
          <LogOut size={16} /> Salir
        </button>
      </nav>

      {/* 2. HEADER NARANJA */}
      <div className="bg-linear-to-r from-[#FF6B00] to-[#ff984d] pt-12 pb-24 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Mi Perfil</h1>
          <p className="text-white/80">Gestiona tu información</p>
        </div>
      </div>

      {/* 3. CONTENEDOR PRINCIPAL (Sube un poco sobre el header para dar efecto de tarjeta) */}
      <div className="max-w-4xl mx-auto -mt-16 px-4">
        
        {/* Título de sección */}
        <div className="bg-[#161618] border border-[#2A2A2D] border-b-0 rounded-t-2xl px-8 py-4 w-max">
          <h2 className="font-bold text-lg">Información Personal</h2>
        </div>

        {/* Tarjeta del Formulario */}
        <form onSubmit={handleSave} className="bg-[#161618] border border-[#2A2A2D] rounded-b-2xl rounded-tr-2xl p-8 shadow-2xl">
          
          {/* Info de Usuario Actual */}
          <div className="flex items-center gap-6 mb-8 border-b border-[#2A2A2D] pb-8">
            <div className="w-24 h-24 bg-[#0F0F11] border border-[#2A2A2D] rounded-2xl p-2 flex-shrink-0">
              {/* Aquí mostramos el avatar seleccionado */}
              <img src={selectedAvatar} alt="Avatar actual" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">ProGamer</h3>
              <p className="text-gray-400">qwe@qwe.com</p>
            </div>
          </div>

          {/* Selector de Avatares (DiceBear) */}
          <div className="mb-8 p-6 bg-[#0F0F11] border border-[#2A2A2D] rounded-xl">
            <h4 className="text-[#00C2FF] font-medium mb-4">Selecciona tu avatar</h4>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
              {avatarSeeds.map((seed) => {
                const url = `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
                const isSelected = selectedAvatar === url;
                return (
                  <button
                    key={seed}
                    type="button"
                    onClick={() => setSelectedAvatar(url)}
                    className={`aspect-square p-2 rounded-lg border transition-all ${
                      isSelected 
                        ? 'border-[#00C2FF] bg-[#00C2FF]/10 ring-2 ring-[#00C2FF]/50' 
                        : 'border-[#2A2A2D] hover:border-gray-500 hover:bg-[#161618]'
                    }`}
                  >
                    <img src={url} alt={`Avatar ${seed}`} className="w-full h-full" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Biografía */}
          <div className="mb-8">
            <h4 className="border-l-4 border-[#00C2FF] pl-3 font-bold mb-4">Biografía</h4>
            <textarea 
              rows={3}
              placeholder="Cuéntanos sobre tu estilo de juego..."
              className="w-full bg-[#0F0F11] border border-[#2A2A2D] rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00C2FF] resize-none"
            ></textarea>
          </div>

          {/* Campos de 3 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block font-bold mb-2">Discord</label>
              <input type="text" placeholder="ProGamer#1234" className="w-full bg-[#0F0F11] border border-[#2A2A2D] rounded-lg px-4 py-3 focus:outline-none focus:border-[#00C2FF]" />
            </div>
            <div>
              <label className="block font-bold mb-2">Rango</label>
              <input type="text" placeholder="Diamante" className="w-full bg-[#0F0F11] border border-[#2A2A2D] rounded-lg px-4 py-3 focus:outline-none focus:border-[#00C2FF]" />
            </div>
            <div>
              <label className="block font-bold mb-2">Región</label>
              <input type="text" placeholder="Centro" className="w-full bg-[#0F0F11] border border-[#2A2A2D] rounded-lg px-4 py-3 focus:outline-none focus:border-[#00C2FF]" />
            </div>
          </div>

          {/* Selección de Juegos */}
          <div className="mb-10">
            <h4 className="border-l-4 border-[#00C2FF] pl-3 font-bold mb-4">Juegos</h4>
            <div className="flex flex-wrap gap-3">
              {juegosDisponibles.map(juego => (
                <button
                  key={juego}
                  type="button"
                  onClick={() => toggleGame(juego)}
                  className={`px-6 py-3 rounded-lg border text-sm font-medium transition-all ${
                    selectedGames.includes(juego)
                      ? 'bg-[#00C2FF] border-[#00C2FF] text-black shadow-[0_0_15px_rgba(0,194,224,0.3)]'
                      : 'bg-[#0F0F11] border-[#2A2A2D] text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {juego}
                </button>
              ))}
            </div>
          </div>

          {/* Botón de Guardar */}
          <div className="flex justify-end border-t border-[#2A2A2D] pt-6">
            <button 
              type="submit"
              className="bg-[#FF6B00] hover:bg-[#ff8533] text-white font-bold py-3 px-10 rounded-xl transition-all shadow-[0_0_20px_rgba(255,107,0,0.2)]"
            >
              Guardar y Continuar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}