"use client";
import { useUser } from "@clerk/nextjs";
import { Loader2, Plus, X, Save } from "lucide-react";
import { useProfile, PREFERENCES_LIST, DAYS_LIST } from "@/hook/useProfile";

export default function PerfilPage() {
  const { user, isLoaded: isUserLoaded } = useUser();
  
  const {
    avatars, availableGames, selectedAvatar, setSelectedAvatar,
    selectedGames, toggleGame, customGame, setCustomGame, addCustomGame,
    bio, setBio, discord, setDiscord, platform, setPlatform, region, setRegion,
    preferences, togglePreference, availability, toggleDay, updateTime,
    isLoading, isSaving, handleSave, router
  } = useProfile();

  if (isLoading || !isUserLoaded) {
    return <div className="min-h-screen bg-[#0F0F11] flex items-center justify-center text-white"><Loader2 className="animate-spin" size={48} /></div>;
  }

 
  const displayName = user?.username || user?.firstName || "Jugador";
  const displayEmail = user?.primaryEmailAddress?.emailAddress || "Sin correo vinculado";

  return (
    <div className="min-h-screen bg-[#0F0F11] text-white font-sans pb-12">

      <div className="bg-linear-to-r from-[#FF6B00] to-[#ff984d] pt-12 pb-24 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Mi Perfil</h1>
          <p className="text-white/80">Gestiona tu información</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto -mt-16 px-4">
        
        <form onSubmit={handleSave} className="bg-[#161618] border border-[#2A2A2D] rounded-2xl p-8 shadow-2xl">
          
          {/* INFO CLERK */}
          <div className="flex items-center gap-6 mb-8 border-b border-[#2A2A2D] pb-8">
            <div className="w-24 h-24 bg-[#0F0F11] border border-[#2A2A2D] rounded-2xl p-2 shrink-0">
              <img src={selectedAvatar} alt="Avatar" className="w-full h-full object-contain" />
            </div>
            <div>
              {/* Mostramos los datos de Clerk aquí */}
              <h3 className="text-2xl font-bold">{displayName}</h3>
              <p className="text-gray-400">{displayEmail}</p>
            </div>
          </div>

          {/* AVATARES */}
          <div className="mb-10">
            <h4 className="border-l-4 border-[#00C2FF] pl-3 font-bold mb-4">Selecciona tu avatar</h4>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 bg-[#0F0F11] border border-[#2A2A2D] rounded-xl p-6">
              {avatars.map((avatar) => (
                <button
                  key={avatar.id} type="button" onClick={() => setSelectedAvatar(avatar.url)}
                  className={`aspect-square p-2 rounded-lg border transition-all ${
                    selectedAvatar === avatar.url ? 'border-[#00C2FF] bg-[#00C2FF]/10 ring-2 ring-[#00C2FF]/50' : 'border-[#2A2A2D] hover:border-gray-500 hover:bg-[#161618]'
                  }`}
                >
                  <img src={avatar.url} alt="Avatar" className="w-full h-full" />
                </button>
              ))}
            </div>
          </div>

          {/* BIOGRAFÍA */}
          <div className="mb-8">
            <h4 className="border-l-4 border-[#00C2FF] pl-3 font-bold mb-4">Biografía</h4>
            <textarea 
              value={bio} onChange={e => setBio(e.target.value)}
              rows={3} placeholder="Cuéntanos sobre tu estilo de juego..."
              className="w-full bg-[#0F0F11] border border-[#2A2A2D] rounded-xl p-4 text-white focus:outline-none focus:border-[#00C2FF] resize-none"
            />
          </div>

          {/* DATOS (Discord, Plataforma, Región) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div>
              <label className="block font-bold text-sm mb-2">Discord</label>
              <input value={discord} onChange={e => setDiscord(e.target.value)} type="text" placeholder="ProGamer#1234" className="w-full bg-[#0F0F11] border border-[#2A2A2D] rounded-lg px-4 py-3 focus:outline-none focus:border-[#00C2FF]" />
            </div>
            <div>
              <label className="block font-bold text-sm mb-2">Plataforma</label>
              <input value={platform} onChange={e => setPlatform(e.target.value)} type="text" placeholder="PC, Xbox, PlayStation..." className="w-full bg-[#0F0F11] border border-[#2A2A2D] rounded-lg px-4 py-3 focus:outline-none focus:border-[#00C2FF]" />
            </div>
            <div>
              <label className="block font-bold text-sm mb-2">Región</label>
              <input value={region} onChange={e => setRegion(e.target.value)} type="text" placeholder="Ej. Norteamérica, LAN..." className="w-full bg-[#0F0F11] border border-[#2A2A2D] rounded-lg px-4 py-3 focus:outline-none focus:border-[#00C2FF]" />
            </div>
          </div>

          {/* JUEGOS Y CUSTOM INPUT */}
          <div className="mb-10">
            <h4 className="border-l-4 border-[#00C2FF] pl-3 font-bold mb-4">Juegos</h4>
            <div className="flex flex-wrap gap-3 mb-4">
              {availableGames.map(juego => (
                <button key={juego} type="button" onClick={() => toggleGame(juego)}
                  className={`px-5 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                    selectedGames.includes(juego) ? 'bg-[#00C2FF] border-[#00C2FF] text-black shadow-[0_0_15px_rgba(0,194,224,0.3)]' : 'bg-[#0F0F11] border-[#2A2A2D] text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {juego}
                </button>
              ))}
            </div>
            
            {/* Input agregar juego */}
            <div className="flex gap-2">
              <input 
                value={customGame} onChange={e => setCustomGame(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCustomGame())}
                type="text" placeholder="Agregar otro juego..." 
                className="flex-1 bg-[#0F0F11] border border-[#2A2A2D] rounded-lg px-4 py-3 focus:outline-none focus:border-[#00C2FF]" 
              />
              <button type="button" onClick={addCustomGame} className="bg-[#00C2FF] hover:bg-[#00A3D9] text-black rounded-lg px-4 flex items-center justify-center transition-colors">
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* PREFERENCIAS */}
          <div className="mb-10">
            <h4 className="border-l-4 border-[#FF6B00] pl-3 font-bold mb-4">Preferencias</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {PREFERENCES_LIST.map(pref => (
                <button key={pref} type="button" onClick={() => togglePreference(pref)}
                  className={`py-2.5 rounded-lg border text-sm font-medium transition-all ${
                    preferences.includes(pref) ? 'bg-[#FF6B00] border-[#FF6B00] text-white shadow-[0_0_15px_rgba(255,107,0,0.3)]' : 'bg-[#0F0F11] border-[#2A2A2D] text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {pref}
                </button>
              ))}
            </div>
          </div>

          {/* DISPONIBILIDAD */}
          <div className="mb-10">
            <h4 className="border-l-4 border-[#eab308] pl-3 font-bold mb-4">Disponibilidad</h4>
            <div className="flex flex-col gap-3">
              {DAYS_LIST.map(day => {
                const isActive = availability[day].active;
                return (
                  <div key={day} className="flex flex-col sm:flex-row items-center gap-4">
                    <button type="button" onClick={() => toggleDay(day)}
                      className={`w-32 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                        isActive ? 'bg-[#00C2FF] border-[#00C2FF] text-black shadow-[0_0_15px_rgba(0,194,224,0.3)]' : 'bg-[#0F0F11] border-[#2A2A2D] text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      {day}
                    </button>
                    <div className={`flex items-center gap-2 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                      <input 
                        type="time" value={availability[day].start} onChange={e => updateTime(day, 'start', e.target.value)}
                        className="bg-[#0F0F11] border border-[#2A2A2D] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00C2FF] color-scheme-dark"
                      />
                      <span className="text-gray-500">-</span>
                      <input 
                        type="time" value={availability[day].end} onChange={e => updateTime(day, 'end', e.target.value)}
                        className="bg-[#0F0F11] border border-[#2A2A2D] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00C2FF] color-scheme-dark"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* FOOTER BUTTONS */}
          <div className="flex justify-between items-center border-t border-[#2A2A2D] pt-6 mt-8">
            <button type="button" onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 transition-colors">
              <X size={18} /> Cancelar
            </button>
            
            <button 
              type="submit" disabled={isSaving}
              className="bg-[#FF6B00] text-white shadow-[0_0_15px_rgba(255,107,0,0.3)] border border-[#FF6B00] 
              hover:opacity-90 disabled:opacity-50 font-bold py-3 px-8 rounded-xl transition-all flex items-center gap-2"
            >
              {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              {isSaving ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}