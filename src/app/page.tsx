"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { obtenerPromedio } from "../utils/rating";

export default function Home() {
  const router = useRouter();

  const products = [
    { id: 1, name: "Polera Casual", price: "$25", image: "polera_casual.jpg", brand: "Nike", category: "Poleras" },
    { id: 2, name: "Camisa Formal", price: "$40", image: "camisa_formal.jpg", brand: "Zara", category: "Camisas" },
    { id: 3, name: "Short Deportivo", price: "$30", image: "short_deportivo.jpg", brand: "Adidas", category: "Shorts" },
    { id: 4, name: "Pantalón Jean", price: "$50", image: "pantalon_jean.jpg", brand: "Levi's", category: "Pantalones" },
    { id: 5, name: "Zapatos de Cuero", price: "$70", image: "zapatos_de_cuero.jpg", brand: "Clarks", category: "Zapatos" },
    { id: 6, name: "Polera Deportiva", price: "$28", image: "polera_deportiva.jpg", brand: "Under Armour", category: "Poleras" },
    { id: 7, name: "Camisa de Lino", price: "$45", image: "camisa_de_lino.jpg", brand: "H&M", category: "Camisas" },
    { id: 8, name: "Short de Playa", price: "$20", image: "short_de_playa.jpg", brand: "Quiksilver", category: "Shorts" },
    { id: 9, name: "Pantalón de Vestir", price: "$55", image: "pantalon_de_vestir.jpg", brand: "Tommy Hilfiger", category: "Pantalones" },
    { id: 10, name: "Zapatillas Urbanas", price: "$85", image: "zapatillas_urbanas.jpg", brand: "Vans", category: "Zapatos" },
    { id: 11, name: "Polera Oversize", price: "$35", image: "polera_oversize.jpg", brand: "Nike", category: "Poleras" },
    { id: 12, name: "Camisa a Cuadros", price: "$38", image: "camisa_a_cuadros.jpg", brand: "Levi's", category: "Camisas" },
    { id: 13, name: "Short Cargo", price: "$32", image: "short_cargo.jpg", brand: "Columbia", category: "Shorts" },
    { id: 14, name: "Pantalón Jogger", price: "$48", image: "pantalon_jogger.jpg", brand: "Puma", category: "Pantalones" },
    { id: 15, name: "Botas de Montaña", price: "$120", image: "botas_de_montaña.jpg", brand: "Salomon", category: "Zapatos" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = [...new Set(products.map((product) => product.category))];
  const filteredProducts = selectedCategory ? products.filter((product) => product.category === selectedCategory) : products;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold">
        Tienda de Ropa
      </header>

      {/* Contenedor Principal */}
      <div className="flex gap-6 mt-6">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Categorías</h2>
          <table className="w-full">
            <tbody>
              <tr>
                <td
                  className={`cursor-pointer p-2 ${selectedCategory === "" ? "font-bold text-blue-600" : ""}`}
                  onClick={() => setSelectedCategory("")}
                >
                  Todas
                </td>
              </tr>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td
                    className={`cursor-pointer p-2 ${selectedCategory === category ? "font-bold text-blue-600" : ""}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  className="cursor-pointer p-2 text-green-600 font-semibold"
                  onClick={() => router.push("/estadisticas")}
                >
                  📊 Ver Estadísticas
                </td>
              </tr>
            </tbody>
          </table>
        </aside>

        {/* Productos */}
        <main className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const promedio = obtenerPromedio(String(product.id));
            return (
              <div key={product.id} className="bg-white shadow-lg rounded-xl p-4 flex flex-col justify-between">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg" />
                <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
                <p className="text-gray-600">{product.price}</p>
                <p className="text-sm text-gray-500">Marca: {product.brand}</p>
                <p className="text-sm text-gray-500">Categoría: {product.category}</p>

                {promedio > 0 && (
                  <p className="text-yellow-500 mt-1">⭐ {promedio.toFixed(1)} / 5</p>
                )}

                <div className="mt-3 flex gap-2">
                  <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 w-full">
                    Comprar
                  </button>
                  <button
                    onClick={() => router.push(`/valorar?id=${product.id}`)}
                    className="bg-yellow-400 text-white py-1 px-3 rounded hover:bg-yellow-500 w-full"
                  >
                    Valorar
                  </button>
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
}
