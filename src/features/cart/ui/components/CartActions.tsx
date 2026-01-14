import { ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CartActionsProps {
  onClear: () => void;
  isEmpty: boolean;
}

export function CartActions({ onClear, isEmpty }: CartActionsProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <button
        onClick={() => navigate('/products')}
        className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
      >
        <ShoppingBag className="w-5 h-5" />
        Continuar Comprando
      </button>
      <button
        onClick={onClear}
        disabled={isEmpty}
        className="flex items-center justify-center gap-2 px-6 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Trash2 className="w-5 h-5" />
        Limpar Carrinho
      </button>
      <button
        onClick={() => navigate('/checkout')}
        disabled={isEmpty}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed sm:flex-1"
      >
        Ir para Checkout
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
