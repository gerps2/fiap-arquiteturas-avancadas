import type { CartRepository } from '../../../shared/domain/repositories/CartRepository';
import type { ProductRepository } from '../../../shared/domain/repositories/ProductRepository';
import { ProductNotFoundError, InvalidQuantityError } from '../../../shared/domain/errors/DomainError';

export class AddToCartUseCase {
  constructor(
    private cartRepository: CartRepository,
    private productRepository: ProductRepository
  ) {}

  async execute(productId: string, quantity: number = 1): Promise<void> {
    if (quantity <= 0) {
      throw new InvalidQuantityError();
    }

    const product = await this.productRepository.getById(productId);
    if (!product) {
      throw new ProductNotFoundError(productId);
    }

    const items = await this.cartRepository.get();
    const existingItemIndex = items.findIndex(item => item.product.id === productId);

    if (existingItemIndex >= 0) {
      items[existingItemIndex].quantity += quantity;
    } else {
      items.push({ product, quantity });
    }

    await this.cartRepository.set(items);
  }
}
