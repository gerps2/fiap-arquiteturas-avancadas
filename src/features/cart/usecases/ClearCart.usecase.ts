import type { CartRepository } from '../../../shared/domain/repositories/CartRepository';

export class ClearCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(): Promise<void> {
    await this.cartRepository.set([]);
  }
}
