import type { CartTotals } from '../../usecases/CalculateCartTotals.usecase';
import { formatBRL, formatUSD } from '../../../../shared/utils/currency';

interface TotalBoxProps {
  totals: CartTotals;
}

export function TotalBox({ totals }: TotalBoxProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Itens:</span>
        <span className="font-semibold">{totals.itemCount}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Total (BRL):</span>
        <span className="text-2xl font-bold text-blue-600">
          {formatBRL(totals.totalBRL)}
        </span>
      </div>
      {totals.totalUSD !== undefined && (
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <span className="text-gray-600">Total (USD):</span>
          <span className="text-xl font-semibold text-green-600">
            {formatUSD(totals.totalUSD)}
          </span>
        </div>
      )}
    </div>
  );
}
