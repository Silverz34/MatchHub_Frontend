import z from "zod";

export const SchemaAvatar = z.object({
 id : z.string(),
 url : z.string()
}); 

export type Avatar = z.infer<typeof SchemaAvatar>;

export const SchemaJuego = z.object({
 id : z.string(),
 name : z.string()
}); 

export type Juego = z.infer<typeof SchemaJuego>;