import { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal, X, Loader2 } from 'lucide-react';
import { PREFERENCES_LIST } from '@/hook/useProfile';
import { DAYS_LIST } from '@/hook/useProfile';

interface FilterDropdownProps {
  availableGames: string[];
  isLoadingGames: boolean;
  selectedGames: string[];
  selectedStyles: string[];
  selectedDays: string[];
  toggleFilter: (filter: string, type: 'game' | 'style' | 'day') => void;
}

export default function FilterDropdown({
  availableGames,
  isLoadingGames,
  selectedGames,
  selectedStyles,
  selectedDays,
  toggleFilter
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeFiltersCount = selectedGames.length + selectedStyles.length + selectedDays.length;

  return (
    <div className="relative" ref={dropdownRef}>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative h-14 px-6 flex items-center gap-3 rounded-xl border transition-all ${
          isOpen || activeFiltersCount > 0 
            ? 'bg-[#161618] border-[#00C2FF] text-white' 
            : 'bg-[#161618] border-[#2A2A2D] text-gray-400 hover:text-white hover:border-gray-500'
        }`}
      >
        <SlidersHorizontal size={20} />
        <span className="font-medium hidden sm:inline">Filtros</span>
        
      
        {activeFiltersCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#FF6B00] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+12px)] w-[320px] max-h-[70vh] overflow-y-auto bg-[#161618] border border-[#2A2A2D] rounded-2xl shadow-2xl z-50 p-6 custom-scrollbar">
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Filtros</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Categoría: Juegos */}
          <div className="mb-6">
            <h3 className="text-[#00C2FF] font-bold text-xs uppercase tracking-widest mb-3">Juegos</h3>
            {isLoadingGames ? (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Loader2 size={14} className="animate-spin" /> Cargando...
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {availableGames.map(game => (
                  <button 
                    key={game} onClick={() => toggleFilter(game, 'game')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      selectedGames.includes(game) ? 'bg-[#00C2FF] border-[#00C2FF] text-black' : 'bg-[#0F0F11] border-[#2A2A2D] text-gray-400 hover:border-gray-500'
                    }`}
                  >
                    {game}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Categoría: Estilo */}
          <div className="mb-6">
            <h3 className="text-[#FF6B00] font-bold text-xs uppercase tracking-widest mb-3">Estilo</h3>
            <div className="flex flex-wrap gap-2">
              {PREFERENCES_LIST.map(style => (
                <button 
                  key={style} onClick={() => toggleFilter(style, 'style')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    selectedStyles.includes(style) ? 'bg-[#FF6B00] border-[#FF6B00] text-white' : 'bg-[#0F0F11] border-[#2A2A2D] text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Categoría: Disponibilidad */}
          <div>
            <h3 className="text-[#eab308] font-bold text-xs uppercase tracking-widest mb-3">Disponibilidad</h3>
            <div className="flex flex-wrap gap-2">
              {DAYS_LIST.map(day => (
                <button 
                  key={day} onClick={() => toggleFilter(day, 'day')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    selectedDays.includes(day) ? 'bg-[#eab308] border-[#eab308] text-black' : 'bg-[#0F0F11] border-[#2A2A2D] text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}