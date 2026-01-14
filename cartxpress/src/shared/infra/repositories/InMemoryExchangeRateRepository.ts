import type { ExchangeRateRepository, ExchangeRateData } from '../../domain/repositories/ExchangeRateRepository';

export class InMemoryExchangeRateRepository implements ExchangeRateRepository {
  private data: ExchangeRateData | null = null;

  async getUsdBrl(): Promise<ExchangeRateData | null> {
    return this.data;
  }

  async setUsdBrl(rate: number, fetchedAt: Date): Promise<void> {
    this.data = { rate, fetchedAt };
  }
}
