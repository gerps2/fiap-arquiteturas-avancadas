import type { CepLookupProvider, CepData } from '../../domain/providers/CepLookupProvider';
import { CepNotFoundError } from '../../domain/errors/DomainError';
import { axiosClient } from '../http/axiosClient';

interface ViaCepResponse {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export class ViaCepLookupProvider implements CepLookupProvider {
  async lookup(cep: string): Promise<CepData> {
    try {
      const cleanCep = cep.replace(/\D/g, '');
      const response = await axiosClient.get<ViaCepResponse>(
        `https://viacep.com.br/ws/${cleanCep}/json/`
      );

      if (response.data.erro) {
        throw new CepNotFoundError(cep);
      }

      return {
        street: response.data.logradouro,
        district: response.data.bairro,
        city: response.data.localidade,
        state: response.data.uf,
      };
    } catch (error) {
      if (error instanceof CepNotFoundError) {
        throw error;
      }
      throw new CepNotFoundError(cep);
    }
  }
}
