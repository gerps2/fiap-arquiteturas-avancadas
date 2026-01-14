import type { CartRepository } from '../../../shared/domain/repositories/CartRepository';
import { InvalidQuantityError } from '../../../shared/domain/errors/DomainError';

export class UpdateCartItemQtyUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(productId: string, quantity: number): Promise<void> {
    if (quantity < 0) {
      throw new InvalidQuantityError();
    }

    const items = await this.cartRepository.get();
    
    if (quantity === 0) {
      const filteredItems = items.filter(item => item.product.id !== productId);
      await this.cartRepository.set(filteredItems);
      return;
    }

    const itemIndex = items.findIndex(item => item.product.id === productId);
    if (itemIndex >= 0) {
      items[itemIndex].quantity = quantity;
      await this.cartRepository.set(items);
    }
  }
}
