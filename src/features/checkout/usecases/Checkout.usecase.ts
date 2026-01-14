import type { CartRepository } from '../../../shared/domain/repositories/CartRepository';
import type { Address } from '../../../shared/domain/entities/Address';

export interface CheckoutPayload {
  fullName: string;
  email: string;
  address: Address;
}

export interface OrderConfirmation {
  orderId: string;
  fullName: string;
  email: string;
  address: Address;
  createdAt: Date;
}

export class CheckoutUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(payload: CheckoutPayload): Promise<OrderConfirmation> {
    const items = await this.cartRepository.get();
    
    if (items.length === 0) {
      throw new Error('Cart is empty');
    }

    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    await this.cartRepository.set([]);

    return {
      orderId,
      fullName: payload.fullName,
      email: payload.email,
      address: payload.address,
      createdAt: new Date(),
    };
  }
}
