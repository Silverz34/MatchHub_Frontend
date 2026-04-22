
export interface ConnectionRequest {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  timeAgo: string;
  type: 'received' | 'sent';
}

export const ConnectionService = {
  getRequests: async (): Promise<ConnectionRequest[]> => {
    // Simulamos la respuesta de tu backend
    return [
      {
        id: "req_1",
        user: { name: "MysticMage", avatar: "🧙‍♀️" },
        timeAgo: "Hace 11h",
        type: "received"
      },
      {
        id: "req_2",
        user: { name: "ThunderStrike", avatar: "⚡" },
        timeAgo: "Hace 23h",
        type: "received"
      },
      {
        id: "req_3",
        user: { name: "ShadowNinja", avatar: "🥷" },
        timeAgo: "Hace 1d",
        type: "sent"
      },
      {
        id: "req_4",
        user: { name: "IceQueen", avatar: "❄️" },
        timeAgo: "Hace 2d",
        type: "sent"
      }
    ];
  },

  // Simulamos las acciones en la base de datos
  acceptRequest: async (id: string) => {
    console.log(`Solicitud ${id} aceptada.`);
    return true;
  },

  rejectRequest: async (id: string) => {
    console.log(`Solicitud ${id} rechazada.`);
    return true;
  }
};