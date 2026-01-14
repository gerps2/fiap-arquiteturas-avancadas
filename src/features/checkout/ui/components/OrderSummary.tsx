import { useState, useEffect } from 'react';
import type { CartItem } from '../../../../shared/domain/entities/CartItem';
import type { CartTotals } from '../../../cart/usecases/CalculateCartTotals.usecase';
import { formatBRL, formatUSD } from '../../../../shared/utils/currency';
import { getContainer } from '../../../../app/di/container';

export function OrderSummary() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totals, setTotals] = useState<CartTotals>({ totalBRL: 0, itemCount: 0 });

  const container = getContainer();

  useEffect(() => {
    const loadData = async () => {
      const cartItems = await container.useCases.getCartSnapshot.execute();
      const rate = await container.useCases.getUsdBrlRate.execute();
      
      setItems(cartItems);
      
      const calculatedTotals = container.useCases.calculateCartTotals.execute(
        cartItems,
        rate || undefined
      );
      setTotals(calculatedTotals);
    };

    loadData();
  }, [container]);

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Resumo do Pedido</h3>
      
      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.product.id} className="flex justify-between text-sm">
            <span className="text-gray-600">
              {item.product.name} x{item.quantity}
            </span>
            <span className="font-medium">
              {formatBRL(item.product.priceBRL * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-3 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total (BRL):</span>
          <span className="text-xl font-bold text-blue-600">
            {formatBRL(totals.totalBRL)}
          </span>
        </div>
        
        {totals.totalUSD !== undefined && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total (USD):</span>
            <span className="text-lg font-semibold text-green-600">
              {formatUSD(totals.totalUSD)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
