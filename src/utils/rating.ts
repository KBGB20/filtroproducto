import { Sentimiento } from "./sentiment";

export interface Valoracion {
  productoId: string;
  comentario: string;
  puntuacion: number;
  sentimiento: Sentimiento;
  fecha: string;
}

const STORAGE_KEY = "valoraciones_productos";

export function guardarValoracion(valoracion: Valoracion) {
  const actuales = obtenerValoraciones();
  actuales.push(valoracion);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(actuales));
}

export function obtenerValoraciones(): Valoracion[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function obtenerPorProducto(productoId: string): Valoracion[] {
  return obtenerValoraciones().filter(v => v.productoId === productoId);
}

export function obtenerPromedio(productoId: string): number {
  const valoraciones = obtenerPorProducto(productoId);
  if (valoraciones.length === 0) return 0;
  const total = valoraciones.reduce((sum, v) => sum + v.puntuacion, 0);
  return total / valoraciones.length;
}
