"use client";

import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import SearchPlayerCard from "@/components/searchPlayer";
import { useSearch } from "@/hook/useSearch";
import { PREFERENCES_LIST } from "@/hook/useProfile";

export default function BuscarPage() {
  const { 
    searchQuery, setSearchQuery, 
    players, isLoading,availableGames,
    selectedGames, selectedStyles, toggleFilter
  } = useSearch();

  return (
    <div className="min-h-screen bg-[#0F0F11] text-white p-6 md:p-10">
      
      <header className="mb-8">
        <p className="text-[#FF6B00] text-sm font-bold tracking-widest uppercase mb-1">Explorar</p>
        <h1 className="text-4xl font-black tracking-tight">Buscar jugadores</h1>
      </header>

      <div className="flex flex-col lg:flex-row gap-10">

        <aside className="w-full lg:w-64 shrink-0 bg-[#161618] border border-[#2A2A2D] rounded-3xl p-6 h-max hidden lg:block">
          <h2 className="text-xl font-bold mb-6">Filtros</h2>

          {/* Filtro: Juegos */}
          <div className="mb-8">
            <h3 className="text-[#00C2FF] font-bold text-sm uppercase tracking-widest mb-4">Juegos</h3>
            {isLoading ? (
               <div className="text-gray-500 text-sm flex items-center gap-2">
                 <Loader2 className="animate-spin" size={14} /> Cargando catálogo...
               </div>
            ) : (
              <ul className="space-y-3">
                {availableGames.map(game => (
                  <li key={game}>
                    <button 
                      onClick={() => toggleFilter(game, 'game')}
                      className={`text-sm text-left transition-colors ${selectedGames.includes(game) ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}`}
                    >
                      {game}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Filtro: Estilo */}
          <div className="mb-8">
            <h3 className="text-[#FF6B00] font-bold text-sm uppercase tracking-widest mb-4">Estilo</h3>
            <ul className="space-y-3">
              {PREFERENCES_LIST.map(style => (
                <li key={style}>
                  <button 
                    onClick={() => toggleFilter(style, 'style')}
                    className={`text-sm transition-colors ${selectedStyles.includes(style) ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}`}
                  >
                    {style}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#eab308] font-bold text-sm uppercase tracking-widest mb-4">Disponibilidad</h3>
            {/* Input simulado como en la imagen */}
            <div className="bg-[#0F0F11] border border-[#2A2A2D] rounded-xl h-10 w-full cursor-pointer hover:border-gray-500 transition-colors"></div>
          </div>
        </aside>

        <main className="flex-1">
          
          {/* Barra de Búsqueda */}
          <div className="flex gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar jugadores..." 
                className="w-full bg-[#161618] border border-[#2A2A2D] rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00C2FF] transition-colors"
              />
            </div>
      

            <button className="bg-[#161618] border border-[#2A2A2D] rounded-xl w-14 h-14 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors lg:hidden">
              <SlidersHorizontal size={20} />
            </button>
          </div>

          {/* Contador de resultados */}
          <p className="text-sm font-bold text-gray-400 mb-4">
            {isLoading ? "Buscando..." : `${players.length} resultados`}
          </p>


          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-[#00C2FF]" size={40} />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {players.map(player => (
                <SearchPlayerCard key={player.id} player={player} />
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}