export interface ExchangeRateData {
  rate: number;
  fetchedAt: Date;
}

export interface ExchangeRateRepository {
  getUsdBrl(): Promise<ExchangeRateData | null>;
  setUsdBrl(rate: number, fetchedAt: Date): Promise<void>;
}
