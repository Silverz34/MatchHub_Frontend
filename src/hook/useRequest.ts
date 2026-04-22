// src/hooks/useRequests.ts
import { useState, useEffect } from "react";
import { ConnectionService, ConnectionRequest } from "@/utils/conectionRandom";

export function useRequests() {
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');
  const [requests, setRequests] = useState<ConnectionRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRequests() {
      setIsLoading(true);
      try {
        const data = await ConnectionService.getRequests();
        setRequests(data);
      } finally {
        setIsLoading(false);
      }
    }
    loadRequests();
  }, []);

  // Filtramos la lista dependiendo de la pestaña activa
  const displayedRequests = requests.filter(req => req.type === activeTab);
  
  // Contadores para las pestañas
  const receivedCount = requests.filter(r => r.type === 'received').length;
  const sentCount = requests.filter(r => r.type === 'sent').length;

  const handleAccept = async (id: string) => {
    await ConnectionService.acceptRequest(id);
    // Removemos la solicitud de la vista
    setRequests(prev => prev.filter(req => req.id !== id));
  };

  const handleReject = async (id: string) => {
    await ConnectionService.rejectRequest(id);
    // Removemos la solicitud de la vista
    setRequests(prev => prev.filter(req => req.id !== id));
  };

  return {
    activeTab, setActiveTab,
    displayedRequests,
    receivedCount, sentCount,
    isLoading,
    handleAccept, handleReject
  };
}