import type { CartItem } from '../../domain/entities/CartItem';
import type { CartRepository } from '../../domain/repositories/CartRepository';

const STORAGE_KEY = 'cartxpress:cart';

export class LocalStorageCartRepositoryDecorator implements CartRepository {
  constructor(private baseRepository: CartRepository) {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const items = JSON.parse(stored) as CartItem[];
        this.baseRepository.set(items);
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage', error);
    }
  }

  private saveToStorage(items: CartItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage', error);
    }
  }

  async get(): Promise<CartItem[]> {
    return this.baseRepository.get();
  }

  async set(items: CartItem[]): Promise<void> {
    await this.baseRepository.set(items);
    this.saveToStorage(items);
  }
}
