
export interface Game {
  id: number;
  nombre: string;
  rawg_id?: number;
  plataformas: string[];
  origen: string;
}

export interface Preference {
  id: number;
  nombre: string;
  descripcion: string;
  selected: boolean;
}

export interface AvatarOption {
  style: string;
  url: string;
}

export interface AvatarsResponse {
  avatars: AvatarOption[];
}