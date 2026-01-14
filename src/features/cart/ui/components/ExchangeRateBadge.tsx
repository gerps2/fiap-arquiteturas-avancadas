import { Loader2, TrendingUp, AlertCircle } from 'lucide-react';

type RateState = 'loading' | 'ok' | 'error';

interface ExchangeRateBadgeProps {
  state: RateState;
  rate: number | null;
}

export function ExchangeRateBadge({ state, rate }: ExchangeRateBadgeProps) {
  if (state === 'loading') {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Buscando cotação...</span>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="flex items-center gap-2 text-sm text-amber-600">
        <AlertCircle className="w-4 h-4" />
        <span>Cotação indisponível no momento</span>
      </div>
    );
  }

  if (state === 'ok' && rate) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600">
        <TrendingUp className="w-4 h-4" />
        <span>USD/BRL: R$ {rate.toFixed(2)}</span>
      </div>
    );
  }

  return null;
}
