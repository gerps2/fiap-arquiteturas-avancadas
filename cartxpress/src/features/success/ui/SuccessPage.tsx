import { PageHeader } from '../../../shared/ui/components/PageHeader';
import { OrderConfirmationCard } from './components/OrderConfirmationCard';

export function SuccessPage() {
  return (
    <div>
      <PageHeader title="Pedido Confirmado" />
      <OrderConfirmationCard />
    </div>
  );
}
