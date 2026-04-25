
import { CompatiblePlayer } from "@/interfaces/dashboard";

interface PlayerCardComponentProps {
  player: CompatiblePlayer;
  isFeatured?: boolean; 
}

export default function PlayerCard({ player, isFeatured = false }: PlayerCardComponentProps) {
  return (
    <div 
      className={`bg-[#161618] border border-[#2A2A2D] rounded-2xl p-6 transition-all duration-300
         hover:border-[#00C2FF] hover:shadow-[0_0_20px_rgba(0,194,224,0.1)] hover:-translate-y-1 flex flex-col
      ${isFeatured ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
      {/* Cabecera: Avatar y Porcentaje de Match */}
      <div className="flex justify-between items-start mb-4">
        <div className="text-4xl w-14 h-14 bg-[#0F0F11] rounded-xl flex items-center justify-center border border-[#2A2A2D] shadow-inner">
          {/* Si usas URL en el futuro, cambias esto por un tag <img> */}
          {player.avatar_url}
        </div>
        <div className="text-right">
          <div className="text-3xl font-black text-[#00C2FF] tracking-tighter">
            {player.total_score}%
          </div>
          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">
            match
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{player.username}</h3>

      <div className ="grow"></div>

      {/* Etiquetas*/}
      {/* <div className="space-y-3 mt-4">

        <div className="flex flex-wrap gap-2">
          {player.games.map((game, idx) => (
            <span key={idx} className="px-2.5 py-1 bg-[#00C2FF] text-black text-[10px] font-bold rounded-md">
              {game}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {player.preferences.map((pref, idx) => (
            <span key={idx} className="px-2.5 py-1 bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/20 text-[10px] font-bold rounded-md">
              {pref}
            </span>
          ))}
        </div>

      </div> */}

    </div>
  );
}