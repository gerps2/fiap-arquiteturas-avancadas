import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../shared/ui/components/PageHeader';
import { EmptyState } from '../../../shared/ui/components/EmptyState';
import { CheckoutForm } from './components/CheckoutForm';
import { OrderSummary } from './components/OrderSummary';
import { useCheckoutViewModel } from '../viewmodel/useCheckoutViewModel';
import { getContainer } from '../../../app/di/container';

export function CheckoutPage() {
  const navigate = useNavigate();
  const [isEmpty, setIsEmpty] = useState(false);
  const container = getContainer();

  useEffect(() => {
    const checkCart = async () => {
      const items = await container.useCases.getCartSnapshot.execute();
      if (items.length === 0) {
        setIsEmpty(true);
      }
    };

    checkCart();
  }, [container]);

  const {
    formData,
    errors,
    isLookingUpCep,
    cepError,
    isSubmitting,
    updateField,
    lookupCep,
    submit,
  } = useCheckoutViewModel();

  if (isEmpty) {
    return (
      <div>
        <PageHeader title="Checkout" />
        <EmptyState
          title="Carrinho vazio"
          description="Adicione produtos ao carrinho antes de finalizar a compra"
          action={
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Ver Produtos
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Checkout"
        subtitle="Finalize sua compra"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CheckoutForm
            formData={formData}
            errors={errors}
            isLookingUpCep={isLookingUpCep}
            cepError={cepError}
            isSubmitting={isSubmitting}
            onUpdate={updateField}
            onLookupCep={lookupCep}
            onSubmit={submit}
          />
        </div>

        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
