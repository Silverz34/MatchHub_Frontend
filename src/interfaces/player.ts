import z, { string } from "zod";


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