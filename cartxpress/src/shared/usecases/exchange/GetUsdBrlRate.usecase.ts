import type { ExchangeRateRepository } from '../../domain/repositories/ExchangeRateRepository';
import type { ExchangeRateProvider } from '../../domain/providers/ExchangeRateProvider';

const TTL_MINUTES = 10;

export class GetUsdBrlRateUseCase {
  constructor(
    private exchangeRateRepository: ExchangeRateRepository,
    private exchangeRateProvider: ExchangeRateProvider
  ) {}

  async execute(): Promise<number | null> {
    try {
      const cached = await this.exchangeRateRepository.getUsdBrl();

      if (cached) {
        const now = new Date();
        const diff = now.getTime() - cached.fetchedAt.getTime();
        const minutesPassed = diff / (1000 * 60);

        if (minutesPassed < TTL_MINUTES) {
          return cached.rate;
        }
      }

      const rate = await this.exchangeRateProvider.getUsdBrlRate();
      await this.exchangeRateRepository.setUsdBrl(rate, new Date());
      return rate;
    } catch {
      const cached = await this.exchangeRateRepository.getUsdBrl();
      return cached ? cached.rate : null;
    }
  }
}
