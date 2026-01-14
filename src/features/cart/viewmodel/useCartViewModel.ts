import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import type { CartItem } from '../../../shared/domain/entities/CartItem';
import type { CartTotals } from '../usecases/CalculateCartTotals.usecase';
import { getContainer } from '../../../app/di/container';

type RateState = 'loading' | 'ok' | 'error';

export function useCartViewModel() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totals, setTotals] = useState<CartTotals>({ totalBRL: 0, itemCount: 0 });
  const [rateState, setRateState] = useState<RateState>('loading');
  const [usdBrlRate, setUsdBrlRate] = useState<number | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const container = getContainer();

  useEffect(() => {
    const loadRate = async () => {
      try {
        setRateState('loading');
        const rate = await container.useCases.getUsdBrlRate.execute();
        
        if (rate) {
          setUsdBrlRate(rate);
          setRateState('ok');
        } else {
          setRateState('error');
        }
      } catch {
        setRateState('error');
      }
    };

    loadRate();
  }, [container]);

  useEffect(() => {
    const loadCart = async () => {
      const cartItems = await container.useCases.getCartSnapshot.execute();
      setItems(cartItems);
      
      const calculatedTotals = container.useCases.calculateCartTotals.execute(
        cartItems,
        usdBrlRate || undefined
      );
      setTotals(calculatedTotals);
    };

    loadCart();
  }, [container, usdBrlRate, refreshTrigger]);

  const increase = async (productId: string) => {
    const item = items.find(i => i.product.id === productId);
    if (item) {
      await container.useCases.updateCartItemQty.execute(productId, item.quantity + 1);
      setRefreshTrigger(prev => prev + 1);
    }
  };

  const decrease = async (productId: string) => {
    const item = items.find(i => i.product.id === productId);
    if (item) {
      const newQty = item.quantity - 1;
      await container.useCases.updateCartItemQty.execute(productId, newQty);
      setRefreshTrigger(prev => prev + 1);
      if (newQty === 0) {
        toast.info('Produto removido do carrinho');
      }
    }
  };

  const remove = async (productId: string) => {
    await container.useCases.removeFromCart.execute(productId);
    setRefreshTrigger(prev => prev + 1);
    toast.info('Produto removido do carrinho');
  };

  const clear = async () => {
    await container.useCases.clearCart.execute();
    setRefreshTrigger(prev => prev + 1);
    toast.success('Carrinho limpo');
  };

  return {
    items,
    totals,
    rateState,
    usdBrlRate,
    increase,
    decrease,
    remove,
    clear,
  };
}
