import type { CartRepository } from '../../../shared/domain/repositories/CartRepository';

export class RemoveFromCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(productId: string): Promise<void> {
    const items = await this.cartRepository.get();
    const filteredItems = items.filter(item => item.product.id !== productId);
    await this.cartRepository.set(filteredItems);
  }
}
