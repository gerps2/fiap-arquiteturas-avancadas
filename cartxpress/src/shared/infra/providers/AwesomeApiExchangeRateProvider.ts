import type { ExchangeRateProvider } from '../../domain/providers/ExchangeRateProvider';
import { ExchangeRateUnavailableError } from '../../domain/errors/DomainError';
import { axiosClient } from '../http/axiosClient';

interface AwesomeApiResponse {
  USDBRL: {
    bid: string;
  };
}

export class AwesomeApiExchangeRateProvider implements ExchangeRateProvider {
  async getUsdBrlRate(): Promise<number> {
    try {
      const response = await axiosClient.get<AwesomeApiResponse>(
        'https://economia.awesomeapi.com.br/json/last/USD-BRL'
      );

      const rate = parseFloat(response.data.USDBRL.bid);
      
      if (isNaN(rate) || rate <= 0) {
        throw new ExchangeRateUnavailableError();
      }

      return rate;
    } catch (error) {
      if (error instanceof ExchangeRateUnavailableError) {
        throw error;
      }
      throw new ExchangeRateUnavailableError();
    }
  }
}
