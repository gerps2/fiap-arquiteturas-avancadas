import type { CepLookupProvider, CepData } from '../../../shared/domain/providers/CepLookupProvider';

export class LookupCepUseCase {
  constructor(private cepLookupProvider: CepLookupProvider) {}

  async execute(cep: string): Promise<CepData> {
    return this.cepLookupProvider.lookup(cep);
  }
}
