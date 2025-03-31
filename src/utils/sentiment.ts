export type Sentimiento = 'positivo' | 'negativo' | 'neutro';

const palabrasPositivas = ["excelente", "bueno", "fantástico", "recomiendo", "perfecto", "maravilloso", "encantado", "rápido"];
const palabrasNegativas = ["malo", "horrible", "defectuoso", "no sirve", "terrible", "decepcionado", "lento", "pésimo"];

export function analizarSentimiento(texto: string): Sentimiento {
  let puntaje = 0;
  const lower = texto.toLowerCase();

  palabrasPositivas.forEach(p => { if (lower.includes(p)) puntaje++; });
  palabrasNegativas.forEach(n => { if (lower.includes(n)) puntaje--; });

  if (puntaje > 0) return 'positivo';
  if (puntaje < 0) return 'negativo';
  return 'neutro';
}
