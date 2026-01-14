import type { ProductRepository } from '../../shared/domain/repositories/ProductRepository';
import type { CartRepository } from '../../shared/domain/repositories/CartRepository';
import type { ExchangeRateRepository } from '../../shared/domain/repositories/ExchangeRateRepository';
import type { CepLookupProvider } from '../../shared/domain/providers/CepLookupProvider';
import type { ExchangeRateProvider } from '../../shared/domain/providers/ExchangeRateProvider';

import { AddToCartUseCase } from '../../features/cart/usecases/AddToCart.usecase';
import { UpdateCartItemQtyUseCase } from '../../features/cart/usecases/UpdateCartItemQty.usecase';
import { RemoveFromCartUseCase } from '../../features/cart/usecases/RemoveFromCart.usecase';
import { ClearCartUseCase } from '../../features/cart/usecases/ClearCart.usecase';
import { GetCartSnapshotUseCase } from '../../features/cart/usecases/GetCartSnapshot.usecase';
import { CalculateCartTotalsUseCase } from '../../features/cart/usecases/CalculateCartTotals.usecase';
import { GetUsdBrlRateUseCase } from '../../shared/usecases/exchange/GetUsdBrlRate.usecase';
import { LookupCepUseCase } from '../../features/checkout/usecases/LookupCep.usecase';
import { CheckoutUseCase } from '../../features/checkout/usecases/Checkout.usecase';

export interface Container {
  repositories: {
    productRepository: ProductRepository;
    cartRepository: CartRepository;
    exchangeRateRepository: ExchangeRateRepository;
  };
  providers: {
    cepLookupProvider: CepLookupProvider;
    exchangeRateProvider: ExchangeRateProvider;
  };
  useCases: {
    addToCart: AddToCartUseCase;
    updateCartItemQty: UpdateCartItemQtyUseCase;
    removeFromCart: RemoveFromCartUseCase;
    clearCart: ClearCartUseCase;
    getCartSnapshot: GetCartSnapshotUseCase;
    calculateCartTotals: CalculateCartTotalsUseCase;
    getUsdBrlRate: GetUsdBrlRateUseCase;
    lookupCep: LookupCepUseCase;
    checkout: CheckoutUseCase;
  };
}

let container: Container | null = null;

export function setContainer(c: Container): void {
  container = c;
}

export function getContainer(): Container {
  if (!container) {
    throw new Error('Container not initialized');
  }
  return container;
}
