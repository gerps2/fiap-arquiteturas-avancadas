import type { CartItem } from '../../domain/entities/CartItem';
import type { CartRepository } from '../../domain/repositories/CartRepository';

export class InMemoryCartRepository implements CartRepository {
  private items: CartItem[] = [];

  async get(): Promise<CartItem[]> {
    return [...this.items];
  }

  async set(items: CartItem[]): Promise<void> {
    this.items = [...items];
  }
}
