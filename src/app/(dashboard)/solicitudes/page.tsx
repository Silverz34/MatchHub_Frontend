"use client";

import { Mail, Send, Loader2 } from "lucide-react";
import RequestCard from "@/components/requestCard";
import { useRequests } from "@/hook/useRequest";

export default function SolicitudesPage() {
  const {
    activeTab, setActiveTab,
    displayedRequests,
    receivedCount, sentCount,
    isLoading,
    handleAccept, handleReject
  } = useRequests();

  return (
    <div className="min-h-screen bg-[#0F0F11] text-white font-sans pb-12">
      <div className="bg-[#00C2FF] pt-12 pb-16 px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Solicitudes</h1>
          <p className="text-white/90 font-medium">Gestiona tus conexiones</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto -mt-8 px-4">
        
        <div className="flex gap-4 mb-8">
          
          <button
            onClick={() => setActiveTab('received')}
            className={`flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all duration-300 ${
              activeTab === 'received'
                ? 'bg-[#FF6B00] text-white shadow-[0_0_15px_rgba(255,107,0,0.3)] border border-[#FF6B00]'
                : 'bg-[#161618] border border-[#2A2A2D] text-gray-400 hover:text-white hover:border-gray-500'
            }`}
          >
            <Mail size={18} />
            Recibidas ({receivedCount})
          </button>

          <button
            onClick={() => setActiveTab('sent')}
            className={`flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all duration-300 ${
              activeTab === 'sent'
                ? 'bg-[#FF6B00] text-white shadow-[0_0_15px_rgba(255,107,0,0.3)] border border-[#FF6B00]'
                : 'bg-[#161618] border border-[#2A2A2D] text-gray-400 hover:text-white hover:border-gray-500'
            }`}
          >
            <Send size={18} />
            Enviadas ({sentCount})
          </button>

        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#00C2FF]" size={40} />
          </div>
        ) : displayedRequests.length === 0 ? (
          <div className="text-center py-20 bg-[#161618] border border-[#2A2A2D] rounded-3xl">
            <p className="text-gray-500">No tienes solicitudes en esta bandeja.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {displayedRequests.map((request) => (
              <RequestCard 
                key={request.id}
                request={request}
                activeTab={activeTab}
                onAccept={handleAccept}
                onReject={handleReject}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}