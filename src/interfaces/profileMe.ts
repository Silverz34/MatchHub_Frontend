
export interface PerfilJuego {
  id: number;
  nombre: string;
}

export interface PerfilPreferencia {
  id: number;
  nombre: string;
}

export interface PerfilDisponibilidad {
  dia_semana: number; 
  hora_inicio: string;
  hora_fin: string;
}

// LA INTERFAZ PRINCIPAL (ProfileResponse)
export interface ProfileResponse {
  id: number;
  username: string;
  email: string;
  avatar_url: string; 
  descripcion: string;
  discord_id: string;
  estilo_juego: "casual" | "competitivo";
  region: "norte" | "centro" | "sur";
  plataformas: string[];
  is_online: boolean;

  juegos: PerfilJuego[];
  preferencias: PerfilPreferencia[];
  disponibilidad: PerfilDisponibilidad[];
}