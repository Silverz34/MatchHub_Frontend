import { CompatiblePlayer } from "@/interfaces/dashboard";

export default function SearchPlayerCard({ player }: { player: CompatiblePlayer }) {
 return (
    <div className="bg-[#161618] border border-[#2A2A2D] rounded-2xl p-6 transition-all duration-300 hover:border-[#00C2FF] flex flex-col sm:flex-row justify-between gap-6">
      <div className="grow">
 
        <div className="flex items-center gap-4 mb-4">
          <div className="shrink-0 flex items-center gap-4">
            
            <div className="w-14 h-14 bg-[#0F0F11] rounded-2xl flex items-center justify-center border border-[#2A2A2D] shadow-inner overflow-hidden">
              <img src={player.avatar_url} alt={player.username} className="w-full h-full object-cover" />
            </div>

            <div className="font-bold text-lg">
              {player.username} 
            </div>
          </div>
        </div>
     
        <div className="flex flex-wrap gap-2">
 
          {player.region && (
            <span className="px-2.5 py-1 bg-[#00C2FF] text-black text-[10px] font-bold rounded-md uppercase">
              {player.region}
            </span>
          )}
          {player.estilo_juego && (
            <span className="px-2.5 py-1 bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/20 text-[10px] font-bold rounded-md uppercase">
              {player.estilo_juego}
            </span>
          )}
          {player.plataformas?.map((plat, idx) => (
             <span key={idx} className="px-2.5 py-1 bg-[#2A2A2D] text-gray-300 border border-gray-600 text-[10px] font-bold rounded-md uppercase">
             {plat}
           </span>
          ))}
        </div>

      </div>

      
    </div>
  );
}