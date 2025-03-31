import ProductRatingStats from '../../components/ProductRatingStats';

export default function EstadisticasPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Estadísticas de Valoraciones</h1>
      <ProductRatingStats />
    </main>
  );
}
