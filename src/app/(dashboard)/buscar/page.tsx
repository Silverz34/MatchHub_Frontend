"use client";

import { Search, Loader2 } from "lucide-react";
import SearchPlayerCard from "@/components/searchPlayer";
import FilterDropdown from "@/components/togleFilter";
import { useSearch } from "@/hook/useSearch";

export default function BuscarPage() {
  const { 
    searchQuery, setSearchQuery, 
    players, isLoading,
    availableGames, isLoadingGames,
    selectedGames, selectedStyles, selectedDays,
    toggleFilter
  } = useSearch();

  return (
    <div className="min-h-screen bg-[#0F0F11] text-white p-6 md:p-10">
      
      <header className="mb-8">
        <p className="text-[#FF6B00] text-sm font-bold tracking-widest uppercase mb-1">Explorar</p>
        <h1 className="text-4xl font-black tracking-tight">Buscar jugadores</h1>
      </header>

      <div className="flex gap-4 mb-8 relative z-40">
        
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar jugadores..." 
            className="w-full h-14 bg-[#161618] border border-[#2A2A2D] rounded-xl pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00C2FF] transition-colors shadow-lg"
          />
        </div>

       <FilterDropdown 
          availableGames={availableGames}
          isLoadingGames={isLoadingGames} 
          selectedGames={selectedGames}
          selectedStyles={selectedStyles}
          selectedDays={selectedDays}
          toggleFilter={toggleFilter}
        />
        
      </div>

      <p className="text-sm font-bold text-gray-400 mb-6">
        {isLoading ? "Buscando..." : `${players.length} resultados`}
      </p>

      <main className="w-full">
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
  );
}