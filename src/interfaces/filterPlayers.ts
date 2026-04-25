
export interface FilteredPlayer {
  id: number;
  username: string;
  avatar_url: string;
  estilo_juego: string;
  region: string;
  plataformas: string[];
  is_online: boolean;
}