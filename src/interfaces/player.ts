import z from "zod";


export const PlayerSchema = z.object({
    id : z.string(),
    name: z.string(),
    avatar: z.string(),
    games: z.array(z.string()),
    preferences: z.array(z.string()),
    matchPercent: z.number(), 
    bio: z.string().optional() 
})


export type Players = z.infer<typeof PlayerSchema>;

export const JugadorSchema = z.object({
    id : z.number(),
    username: z.string(),
    email: z.string(),
    avatar_url: z.string(),
    estilo_juego: z.string(),
    region : z.string(),
    estado: z.string(),
})

export type jugador = z.infer<typeof JugadorSchema>;