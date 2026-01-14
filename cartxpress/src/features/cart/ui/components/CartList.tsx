import type { CartItem } from '../../../../shared/domain/entities/CartItem';
import { CartItemRow } from './CartItemRow';

interface CartListProps {
  items: CartItem[];
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
}

export function CartList({ items, onIncrease, onDecrease, onRemove }: CartListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItemRow
          key={item.product.id}
          item={item}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
