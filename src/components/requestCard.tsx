
import { Check, X } from 'lucide-react';
import { ConnectionRequest } from '@/utils/conectionRandom';

interface RequestCardProps {
  request: ConnectionRequest;
  activeTab: 'received' | 'sent';
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

export default function RequestCard({ request, activeTab, onAccept, onReject }: RequestCardProps) {
  return (
    <div className="bg-[#161618] border border-[#2A2A2D] rounded-2xl p-5 flex items-center justify-between transition-all hover:border-gray-600">
      
      {/* Info del Jugador */}
      <div className="flex items-center gap-4">
        <div className="text-2xl w-12 h-12 bg-[#0F0F11] rounded-xl flex items-center justify-center border border-[#2A2A2D]">
          {request.user.avatar}
        </div>
        <div>
          <h3 className="font-bold text-lg leading-tight">{request.user.name}</h3>
          <p className="text-xs text-gray-500">{request.timeAgo}</p>
        </div>
      </div>

      {activeTab === 'received' ? (
        <div className="flex gap-3">
          <button 
            onClick={() => onAccept(request.id)}
            className="w-10 h-10 rounded-xl bg-[#00C2FF] hover:bg-[#00A3D9] text-black flex items-center justify-center transition-colors shadow-lg"
          >
            <Check size={20} strokeWidth={3} />
          </button>
          <button 
            onClick={() => onReject(request.id)}
            className="w-10 h-10 rounded-xl bg-[#ef4444] hover:bg-[#dc2626] text-white flex items-center justify-center transition-colors shadow-lg"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>
      ) : (
        <div className="px-4 py-2 bg-[#0F0F11] border border-[#2A2A2D] rounded-lg text-xs font-bold text-gray-400">
          Pendiente
        </div>
      )}

    </div>
  );
}