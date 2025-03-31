import ProductRatingForm from '../../components/ProductRatingForm';

export default function ValorarPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Valorar un Producto</h1>
      <ProductRatingForm />
    </main>
  );
}
