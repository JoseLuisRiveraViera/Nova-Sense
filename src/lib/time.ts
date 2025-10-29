// src/lib/time.ts
// Helper de tiempo relativo para "Última actualización"

export function formatRelative(from: Date | string, now: Date = new Date()): string {
  const d = typeof from === "string" ? new Date(from) : from;
  const diff = Math.max(0, now.getTime() - d.getTime());
  const min = Math.floor(diff / 60000);
  const hrs = Math.floor(min / 60);
  const days = Math.floor(hrs / 24);
  
  if (days > 0) return days === 1 ? "hace 1 día" : `hace ${days} días`;
  if (hrs > 0) return hrs === 1 ? "hace 1 hora" : `hace ${hrs} horas`;
  if (min > 0) return min === 1 ? "hace 1 minuto" : `hace ${min} minutos`;
  return "hace unos segundos";
}

export function lastUpdatedLabel(lastUpdated: Date | string): string {
  return `Última actualización: ${formatRelative(lastUpdated)}`;
}