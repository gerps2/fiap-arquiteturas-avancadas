export interface ExchangeRateProvider {
  getUsdBrlRate(): Promise<number>;
}
