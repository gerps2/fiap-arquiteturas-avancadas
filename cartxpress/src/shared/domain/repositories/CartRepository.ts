import type { CartItem } from '../entities/CartItem';

export interface CartRepository {
  get(): Promise<CartItem[]>;
  set(items: CartItem[]): Promise<void>;
}
