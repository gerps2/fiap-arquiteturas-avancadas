import { PageHeader } from '../../../shared/ui/components/PageHeader';
import { EmptyState } from '../../../shared/ui/components/EmptyState';
import { CartList } from './components/CartList';
import { TotalBox } from './components/TotalBox';
import { ExchangeRateBadge } from './components/ExchangeRateBadge';
import { CartActions } from './components/CartActions';
import { useCartViewModel } from '../viewmodel/useCartViewModel';
import { useNavigate } from 'react-router-dom';

export function CartPage() {
  const navigate = useNavigate();
  const {
    items,
    totals,
    rateState,
    usdBrlRate,
    increase,
    decrease,
    remove,
    clear,
  } = useCartViewModel();

  const isEmpty = items.length === 0;

  if (isEmpty) {
    return (
      <div>
        <PageHeader title="Carrinho" subtitle="Seu carrinho de compras" />
        <EmptyState
          title="Seu carrinho está vazio"
          description="Adicione produtos para começar suas compras"
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
      <PageHeader title="Carrinho" subtitle="Seu carrinho de compras" />
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
        <ExchangeRateBadge state={rateState} rate={usdBrlRate} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CartList
            items={items}
            onIncrease={increase}
            onDecrease={decrease}
            onRemove={remove}
          />
        </div>
        
        <div className="space-y-4">
          <TotalBox totals={totals} />
          <CartActions onClear={clear} isEmpty={isEmpty} />
        </div>
      </div>
    </div>
  );
}
