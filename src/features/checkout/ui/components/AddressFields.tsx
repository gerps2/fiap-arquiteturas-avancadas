import type { CheckoutFormData } from '../../schemas/checkout.schema';

interface AddressFieldsProps {
  formData: CheckoutFormData;
  errors: Partial<Record<keyof CheckoutFormData, string>>;
  onUpdate: (field: keyof CheckoutFormData, value: string) => void;
}

export function AddressFields({ formData, errors, onUpdate }: AddressFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
            Logradouro *
          </label>
          <input
            id="street"
            type="text"
            value={formData.street}
            onChange={(e) => onUpdate('street', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-colors ${
              errors.street ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.street && (
            <p className="mt-1 text-sm text-red-600">{errors.street}</p>
          )}
        </div>

        <div>
          <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
            Número *
          </label>
          <input
            id="number"
            type="text"
            value={formData.number}
            onChange={(e) => onUpdate('number', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-colors ${
              errors.number ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.number && (
            <p className="mt-1 text-sm text-red-600">{errors.number}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
            Bairro *
          </label>
          <input
            id="district"
            type="text"
            value={formData.district}
            onChange={(e) => onUpdate('district', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-colors ${
              errors.district ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.district && (
            <p className="mt-1 text-sm text-red-600">{errors.district}</p>
          )}
        </div>

        <div>
          <label htmlFor="complement" className="block text-sm font-medium text-gray-700 mb-1">
            Complemento
          </label>
          <input
            id="complement"
            type="text"
            value={formData.complement || ''}
            onChange={(e) => onUpdate('complement', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            Cidade *
          </label>
          <input
            id="city"
            type="text"
            value={formData.city}
            onChange={(e) => onUpdate('city', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-colors ${
              errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
          )}
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            UF *
          </label>
          <input
            id="state"
            type="text"
            value={formData.state}
            onChange={(e) => onUpdate('state', e.target.value.toUpperCase())}
            maxLength={2}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-colors uppercase ${
              errors.state ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state}</p>
          )}
        </div>
      </div>
    </div>
  );
}
