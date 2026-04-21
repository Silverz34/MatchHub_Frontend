import z from "zod";
import { SchemaJuego } from "./avatar";

export const SchemaAvatar = z.object({
  avatarUrl: z.string(),
  games: z.string(),
  bio:z.string(),      
  discord: z.string(), 
  plataforma: z.string(),    
  region: z.string(),  
  juego: SchemaJuego
}); 

export type Profile = z.infer<typeof SchemaAvatar>;