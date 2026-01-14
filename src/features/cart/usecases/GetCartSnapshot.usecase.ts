import type { CartItem } from '../../../shared/domain/entities/CartItem';
import type { CartRepository } from '../../../shared/domain/repositories/CartRepository';

export class GetCartSnapshotUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(): Promise<CartItem[]> {
    return this.cartRepository.get();
  }
}
