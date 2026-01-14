import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import type { Product } from '../../../shared/domain/entities/Product';
import { getContainer } from '../../../app/di/container';

export function useProductsViewModel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const container = getContainer();

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await container.repositories.productRepository.list();
      setProducts(data);
    } catch (err) {
      setError('Erro ao carregar produtos');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [container]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const addToCart = async (productId: string) => {
    try {
      await container.useCases.addToCart.execute(productId, 1);
      toast.success('Produto adicionado ao carrinho!');
    } catch (err) {
      toast.error('Erro ao adicionar produto ao carrinho');
      console.error(err);
    }
  };

  return {
    products,
    isLoading,
    error,
    addToCart,
  };
}
