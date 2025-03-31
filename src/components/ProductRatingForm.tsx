'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { products } from '../utils/products';
import { analizarSentimiento } from '../utils/sentiment';
import { guardarValoracion } from '../utils/rating';

export default function ProductRatingForm() {
  const router = useRouter();
  const [productoId, setProductoId] = useState<number>(1);
  const [comentario, setComentario] = useState('');
  const [puntuacion, setPuntuacion] = useState(5);

  // Obtener id desde window.location
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      if (id) setProductoId(parseInt(id));
    }
  }, []);

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
    router.push('/');
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
