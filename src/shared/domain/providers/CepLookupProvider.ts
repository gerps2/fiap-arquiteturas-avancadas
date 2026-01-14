export interface CepData {
  street: string;
  district: string;
  city: string;
  state: string;
}

export interface CepLookupProvider {
  lookup(cep: string): Promise<CepData>;
}
