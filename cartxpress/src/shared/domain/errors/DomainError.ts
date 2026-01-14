export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainError';
  }
}

export class ProductNotFoundError extends DomainError {
  constructor(productId: string) {
    super(`Product with id ${productId} not found`);
    this.name = 'ProductNotFoundError';
  }
}

export class InvalidQuantityError extends DomainError {
  constructor() {
    super('Quantity must be greater than 0');
    this.name = 'InvalidQuantityError';
  }
}

export class CepNotFoundError extends DomainError {
  constructor(cep: string) {
    super(`CEP ${cep} not found`);
    this.name = 'CepNotFoundError';
  }
}

export class ExchangeRateUnavailableError extends DomainError {
  constructor() {
    super('Exchange rate is currently unavailable');
    this.name = 'ExchangeRateUnavailableError';
  }
}
