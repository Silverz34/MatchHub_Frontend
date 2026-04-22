
import { Players } from '@/interfaces/player';

export default function SearchPlayerCard({ player }: { player: Players }) {
 return (
    <div className="bg-[#161618] border border-[#2A2A2D] rounded-2xl p-6 transition-all duration-300 hover:border-[#00C2FF] flex flex-col sm:flex-row justify-between gap-6">
      <div className="grow">
 
        <div className="flex items-center gap-4 mb-4">

          <div className="shrink-0 flex items-center gap-4">
            <div className="text-4xl w-14 h-14 bg-[#0F0F11] rounded-2xl flex items-center justify-center border border-[#2A2A2D] shadow-inner">
              {player.avatar}
            </div>
            <div className="font-bold text-lg">
              {player.name}
            </div>
          </div>

        </div>
     
        <p className="text-sm text-gray-400 mb-4 leading-relaxed max-w-3xl">
          {player.bio}
        </p>

        <div className="flex flex-wrap gap-2">
          {player.games.map((game, idx) => (
            <span key={`g-${idx}`} className="px-2.5 py-1 bg-[#00C2FF] text-black text-[10px] font-bold rounded-md">
              {game}
            </span>
          ))}
          {player.preferences.map((pref, idx) => (
            <span key={`p-${idx}`} className="px-2.5 py-1 bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/20 text-[10px] font-bold rounded-md">
              {pref}
            </span>
          ))}
        </div>

      </div>

      <div className="shrink-0 flex flex-col items-start sm:items-end mt-4 sm:mt-0">
        <div className="text-3xl font-black text-[#00C2FF] tracking-tighter">
          {player.matchPercent}%
        </div>
        <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">
          match
        </div>
      </div>
      
    </div>
  );
}