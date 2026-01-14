import type { CartItem } from '../../../shared/domain/entities/CartItem';

export interface CartTotals {
  totalBRL: number;
  totalUSD?: number;
  itemCount: number;
}

export class CalculateCartTotalsUseCase {
  execute(items: CartItem[], usdBrlRate?: number): CartTotals {
    const totalBRL = items.reduce((sum, item) => {
      return sum + (item.product.priceBRL * item.quantity);
    }, 0);

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      totalBRL,
      totalUSD: usdBrlRate ? totalBRL / usdBrlRate : undefined,
      itemCount,
    };
  }
}
