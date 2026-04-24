export const PREFERENCES_LIST = [
  "Competitivo", "Casual", "Comunicativo", "Estratégico",
  "Agresivo", "Defensivo", "Flexible", "Paciente",
  "Serio", "Divertido", "Nocturno", "Social"
];

export const DAYS_LIST = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export type PlatformValue = "pc" | "ps" | "xbox" | "switch" | "mobile";

export const PLATFORM_OPTIONS: { value: PlatformValue; label: string }[] = [
  { value: "pc",     label: "PC" },
  { value: "ps",     label: "PlayStation (PS4 / PS5)" },
  { value: "xbox",   label: "Xbox" },
  { value: "switch", label: "Nintendo Switch" },
  { value: "mobile", label: "Mobile (Android / iOS)" },
];