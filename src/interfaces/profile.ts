import z from "zod";
import { SchemaJuego } from "./avatar";

export const SchemaProfile = z.object({
  avatarUrl: z.string(),
  games: z.string().optional(),
  bio: z.string().optional(),
  discord: z.string().optional(),
  plataforma: z.string().optional(),
  region: z.string().optional(),
  juego: SchemaJuego.optional()
});

export type Profile = z.infer<typeof SchemaProfile>;