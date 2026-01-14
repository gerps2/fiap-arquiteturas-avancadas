import { Plus, Minus, Trash2 } from 'lucide-react';
import type { CartItem } from '../../../../shared/domain/entities/CartItem';
import { formatBRL } from '../../../../shared/utils/currency';

interface CartItemRowProps {
  item: CartItem;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
}

export function CartItemRow({ item, onIncrease, onDecrease, onRemove }: CartItemRowProps) {
  const subtotal = item.product.priceBRL * item.quantity;

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <img
        src={item.product.imageUrl}
        alt={item.product.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
        <p className="text-sm text-gray-600">{formatBRL(item.product.priceBRL)} cada</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onDecrease(item.product.id)}
          className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          aria-label="Diminuir quantidade"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center font-semibold">{item.quantity}</span>
        <button
          onClick={() => onIncrease(item.product.id)}
          className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          aria-label="Aumentar quantidade"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="text-right">
        <p className="font-bold text-gray-900">{formatBRL(subtotal)}</p>
      </div>
      <button
        onClick={() => onRemove(item.product.id)}
        className="p-2 text-red-600 hover:bg-red-50 rounded focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
        aria-label="Remover item"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
