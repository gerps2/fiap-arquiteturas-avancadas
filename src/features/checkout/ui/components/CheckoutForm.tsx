import { Loader2, Search } from 'lucide-react';
import type { CheckoutFormData } from '../../schemas/checkout.schema';
import { AddressFields } from './AddressFields';
import { maskCep } from '../../../../shared/utils/masks';

interface CheckoutFormProps {
  formData: CheckoutFormData;
  errors: Partial<Record<keyof CheckoutFormData, string>>;
  isLookingUpCep: boolean;
  cepError: string | null;
  isSubmitting: boolean;
  onUpdate: (field: keyof CheckoutFormData, value: string) => void;
  onLookupCep: () => void;
  onSubmit: () => void;
}

export function CheckoutForm({
  formData,
  errors,
  isLookingUpCep,
  cepError,
  isSubmitting,
  onUpdate,
  onLookupCep,
  onSubmit,
}: CheckoutFormProps) {
  const handleCepChange = (value: string) => {
    const masked = maskCep(value);
    onUpdate('cep', masked);
  };

  const handleCepBlur = () => {
    if (formData.cep.replace(/\D/g, '').length === 8) {
      onLookupCep();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Dados Pessoais</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Nome Completo *
            </label>
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => onUpdate('fullName', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-colors ${
                errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => onUpdate('email', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-colors ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Endereço de Entrega</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-1">
              CEP *
            </label>
            <div className="flex gap-2">
              <input
                id="cep"
                type="text"
                value={formData.cep}
                onChange={(e) => handleCepChange(e.target.value)}
                onBlur={handleCepBlur}
                placeholder="00000-000"
                maxLength={9}
                disabled={isLookingUpCep}
                className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.cep || cepError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              <button
                type="button"
                onClick={onLookupCep}
                disabled={isLookingUpCep}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                aria-label="Buscar CEP"
              >
                {isLookingUpCep ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                Buscar
              </button>
            </div>
            {errors.cep && (
              <p className="mt-1 text-sm text-red-600">{errors.cep}</p>
            )}
            {cepError && (
              <p className="mt-1 text-sm text-red-600">{cepError}</p>
            )}
          </div>

          <AddressFields
            formData={formData}
            errors={errors}
            onUpdate={onUpdate}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Finalizando...
          </>
        ) : (
          'Finalizar Pedido'
        )}
      </button>
    </div>
  );
}
