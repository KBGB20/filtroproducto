'use client';
import { obtenerPromedio } from '../utils/rating';

interface Props {
  id: number;
  name: string;
  image: string;
  price: string;
  brand: string;
  category: string;
}

export default function ProductCard({ id, name, image, price, brand, category }: Props) {
  const promedio = obtenerPromedio(String(id));

  return (
    <div className="border p-4 rounded shadow bg-white">
      <img src={`/${image}`} alt={name} className="w-full h-48 object-cover rounded" />
      <div className="mt-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{brand} • {category}</p>
        <p className="font-bold mt-1">{price}</p>
        {promedio > 0 && (
          <div className="mt-1 text-yellow-500">
            ⭐ {promedio.toFixed(1)} / 5
          </div>
        )}
      </div>
    </div>
  );
}
