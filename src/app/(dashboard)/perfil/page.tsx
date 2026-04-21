"use client";
import { Loader2 } from "lucide-react";
import { useProfile } from "@/hook/useProfile";

export default function PerfilPage() {
  const {
    avatars,
    availableGames,
    selectedAvatar,
    setSelectedAvatar,
    selectedGames,
    toggleGame,
    isLoading,
    isSaving,
    handleSave
  } = useProfile();

  if (isLoading) {
    return <div className="min-h-screen bg-[#0F0F11] flex items-center justify-center text-white"><Loader2 className="animate-spin" size={48} /></div>;
  }

  return (
    <div className="min-h-screen bg-[#0F0F11] text-white font-sans pb-12">
      {/* ... NAVBAR Y HEADER OMITIDOS PARA AHORRAR ESPACIO (Son exactamente iguales al código anterior) ... */}
      
      <div className="max-w-4xl mx-auto mt-8 px-4">
        
        <div className="bg-[#161618] border border-[#2A2A2D] border-b-0 rounded-t-2xl px-8 py-4 w-max">
          <h2 className="font-bold text-lg">Información Personal</h2>
        </div>

        <form onSubmit={handleSave} className="bg-[#161618] border border-[#2A2A2D] rounded-b-2xl rounded-tr-2xl p-8 shadow-2xl">
          
          <div className="flex items-center gap-6 mb-8 border-b border-[#2A2A2D] pb-8">
            <div className="w-24 h-24 bg-[#0F0F11] border border-[#2A2A2D] rounded-2xl p-2 shrink-0">
              <img src={selectedAvatar} alt="Avatar actual" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">ProGamer</h3>
              <p className="text-gray-400">qwe@qwe.com</p>
            </div>
          </div>

          <div className="mb-8 p-6 bg-[#0F0F11] border border-[#2A2A2D] rounded-xl">
            <h4 className="text-[#00C2FF] font-medium mb-4">Selecciona tu avatar</h4>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
           
              {avatars.map((avatar) => (
                <button
                  key={avatar.id}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar.url)}
                  className={`aspect-square p-2 rounded-lg border transition-all ${
                    selectedAvatar === avatar.url 
                      ? 'border-[#00C2FF] bg-[#00C2FF]/10 ring-2 ring-[#00C2FF]/50' 
                      : 'border-[#2A2A2D] hover:border-gray-500 hover:bg-[#161618]'
                  }`}
                >
                  <img src={avatar.url} alt={`Avatar ${avatar.id}`} className="w-full h-full" />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-10 mt-8">
            <h4 className="border-l-4 border-[#00C2FF] pl-3 font-bold mb-4">Juegos</h4>
            <div className="flex flex-wrap gap-3">
              {/* Iteramos sobre los juegos dinámicos */}
              {availableGames.map(juego => (
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

          <div className="flex justify-end border-t border-[#2A2A2D] pt-6">
            <button 
              type="submit"
              disabled={isSaving}
              className="bg-[#FF6B00] hover:bg-[#ff8533] disabled:opacity-50 text-white font-bold py-3 px-10 rounded-xl transition-all shadow-[0_0_20px_rgba(255,107,0,0.2)] flex items-center gap-2"
            >
              {isSaving ? <Loader2 className="animate-spin" size={20} /> : null}
              {isSaving ? "Guardando..." : "Guardar y Continuar"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}