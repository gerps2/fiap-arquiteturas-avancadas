import type { Container } from './container';
import { setContainer } from './container';

import { InMemoryProductRepository } from '../../shared/infra/repositories/InMemoryProductRepository';
import { InMemoryCartRepository } from '../../shared/infra/repositories/InMemoryCartRepository';
import { InMemoryExchangeRateRepository } from '../../shared/infra/repositories/InMemoryExchangeRateRepository';
import { LocalStorageCartRepositoryDecorator } from '../../shared/infra/repositories/LocalStorageCartRepositoryDecorator';

import { ViaCepLookupProvider } from '../../shared/infra/providers/ViaCepLookupProvider';
import { AwesomeApiExchangeRateProvider } from '../../shared/infra/providers/AwesomeApiExchangeRateProvider';

import { AddToCartUseCase } from '../../features/cart/usecases/AddToCart.usecase';
import { UpdateCartItemQtyUseCase } from '../../features/cart/usecases/UpdateCartItemQty.usecase';
import { RemoveFromCartUseCase } from '../../features/cart/usecases/RemoveFromCart.usecase';
import { ClearCartUseCase } from '../../features/cart/usecases/ClearCart.usecase';
import { GetCartSnapshotUseCase } from '../../features/cart/usecases/GetCartSnapshot.usecase';
import { CalculateCartTotalsUseCase } from '../../features/cart/usecases/CalculateCartTotals.usecase';
import { GetUsdBrlRateUseCase } from '../../shared/usecases/exchange/GetUsdBrlRate.usecase';
import { LookupCepUseCase } from '../../features/checkout/usecases/LookupCep.usecase';
import { CheckoutUseCase } from '../../features/checkout/usecases/Checkout.usecase';

import { mockProducts } from '../../features/products/mocks/products.mock';

export function initializeContainer(): void {
  const productRepository = new InMemoryProductRepository(mockProducts);
  const baseCartRepository = new InMemoryCartRepository();
  const cartRepository = new LocalStorageCartRepositoryDecorator(baseCartRepository);
  const exchangeRateRepository = new InMemoryExchangeRateRepository();

  const cepLookupProvider = new ViaCepLookupProvider();
  const exchangeRateProvider = new AwesomeApiExchangeRateProvider();

  const addToCart = new AddToCartUseCase(cartRepository, productRepository);
  const updateCartItemQty = new UpdateCartItemQtyUseCase(cartRepository);
  const removeFromCart = new RemoveFromCartUseCase(cartRepository);
  const clearCart = new ClearCartUseCase(cartRepository);
  const getCartSnapshot = new GetCartSnapshotUseCase(cartRepository);
  const calculateCartTotals = new CalculateCartTotalsUseCase();
  const getUsdBrlRate = new GetUsdBrlRateUseCase(exchangeRateRepository, exchangeRateProvider);
  const lookupCep = new LookupCepUseCase(cepLookupProvider);
  const checkout = new CheckoutUseCase(cartRepository);

  const container: Container = {
    repositories: {
      productRepository,
      cartRepository,
      exchangeRateRepository,
    },
    providers: {
      cepLookupProvider,
      exchangeRateProvider,
    },
    useCases: {
      addToCart,
      updateCartItemQty,
      removeFromCart,
      clearCart,
      getCartSnapshot,
      calculateCartTotals,
      getUsdBrlRate,
      lookupCep,
      checkout,
    },
  };

  setContainer(container);
}
