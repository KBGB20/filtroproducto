'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { products } from '../utils/products';
import { analizarSentimiento } from '../utils/sentiment';
import { guardarValoracion } from '../utils/rating';

export default function ProductRatingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idFromQuery = searchParams.get('id');

  const [productoId, setProductoId] = useState<number>(idFromQuery ? parseInt(idFromQuery) : 1);
  const [comentario, setComentario] = useState('');
  const [puntuacion, setPuntuacion] = useState(5);

  useEffect(() => {
    if (idFromQuery) {
      setProductoId(parseInt(idFromQuery));
    }
  }, [idFromQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sentimiento = analizarSentimiento(comentario);
    guardarValoracion({
      productoId: String(productoId),
      comentario,
      puntuacion,
      sentimiento,
      fecha: new Date().toISOString(),
    });
    router.push('/'); // Redirigir al inicio
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Valorar Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={productoId}
          onChange={e => setProductoId(Number(e.target.value))}
          className="w-full border p-2 rounded"
        >
          {products.map(prod => (
            <option key={prod.id} value={prod.id}>
              {prod.name}
            </option>
          ))}
        </select>

        <textarea
          value={comentario}
          onChange={e => setComentario(e.target.value)}
          placeholder="Escribe un comentario..."
          className="w-full border p-2 rounded h-24"
          required
        />

        <div className="flex items-center space-x-2">
          <label>Calificación:</label>
          <input
            type="number"
            min="1"
            max="5"
            value={puntuacion}
            onChange={e => setPuntuacion(Number(e.target.value))}
            className="border p-1 w-16 rounded"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Enviar Valoración
        </button>
      </form>
    </div>
  );
}
