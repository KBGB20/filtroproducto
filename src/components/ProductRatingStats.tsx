'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { obtenerValoraciones } from '../utils/rating';
import { products } from '../utils/products';

export default function ProductRatingStats() {
  const [resumen, setResumen] = useState<any[]>([]);
  const [historial, setHistorial] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const data = obtenerValoraciones();
    setHistorial(data);

    const resumenPorProducto = products.map(product => {
      const delProducto = data.filter(v => v.productoId === String(product.id));
      const promedio = delProducto.length > 0
        ? delProducto.reduce((sum, v) => sum + v.puntuacion, 0) / delProducto.length
        : 0;
      return {
        ...product,
        promedio: promedio.toFixed(1),
        total: delProducto.length
      };
    });

    setResumen(resumenPorProducto);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Estadísticas de Valoraciones</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resumen.filter(r => r.total > 0).map(item => (
          <div key={item.id} className="p-4 border rounded bg-white shadow">
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-500">⭐ Promedio: {item.promedio} ({item.total} valoraciones)</p>
          </div>
        ))}
      </div>

      <hr className="my-6" />

      <h3 className="text-xl font-semibold mb-2">Historial de Comentarios</h3>
      <ul className="space-y-2 mb-8">
        {historial.slice(-20).reverse().map((item, idx) => (
          <li key={idx} className="border p-2 rounded bg-gray-50">
            <p><strong>Producto:</strong> {products.find(p => p.id === Number(item.productoId))?.name}</p>
            <p><strong>Puntaje:</strong> {item.puntuacion} ⭐</p>
            <p><strong>Comentario:</strong> {item.comentario}</p>
            <p><strong>Sentimiento:</strong> {item.sentimiento}</p>
            <p className="text-xs text-gray-400">{new Date(item.fecha).toLocaleString()}</p>
          </li>
        ))}
      </ul>

      {/* Botón para volver */}
      <div className="text-center">
        <button
          onClick={() => router.push('/')}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Volver a la tienda
        </button>
      </div>
    </div>
  );
}
