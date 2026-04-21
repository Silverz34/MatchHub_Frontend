
import z from "zod";

export const SchemaProfile = z.object({
  avatarUrl: z.string(),
  games: z.array(z.string()).optional(),
  bio: z.string().max(300, "La biografía no puede superar los 300 caracteres.").optional(),
  discord: z.string().regex(/^.{3,32}#[0-9]{4}$/, "Formato inválido (Ej: Gamer#1234)").optional().or(z.literal("")),
  region: z.string().optional(),
  preferences: z.array(z.string()).optional(),
  platform: z.string().optional(),
  availability: z.record(
    z.string(),
    z.object({ 
      active: z.boolean(), 
      start: z.string(), 
      end: z.string() 
    })
  ).optional(),
});

export type Profile = z.infer<typeof SchemaProfile>;