import { PageHeader } from '../../../shared/ui/components/PageHeader';
import { ErrorState } from '../../../shared/ui/components/ErrorState';
import { ProductGrid } from './components/ProductGrid';
import { ProductGridSkeleton } from './components/ProductGridSkeleton';
import { useProductsViewModel } from '../viewmodel/useProductsViewModel';

export function ProductsPage() {
  const { products, isLoading, error, addToCart } = useProductsViewModel();

  if (isLoading) {
    return (
      <div>
        <PageHeader
          title="Produtos"
          subtitle="Confira nosso catálogo de produtos"
        />
        <ProductGridSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <PageHeader title="Produtos" />
        <ErrorState message={error} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Produtos"
        subtitle="Confira nosso catálogo de produtos"
      />
      <ProductGrid products={products} onAddToCart={addToCart} />
    </div>
  );
}
