import { CheckCircle, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function OrderConfirmationCard() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Pedido Realizado com Sucesso!
        </h2>

        <p className="text-gray-600 mb-8">
          Obrigado por sua compra! Você receberá um email de confirmação em breve com os detalhes do seu pedido.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/products')}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            Continuar Comprando
          </button>
        </div>
      </div>
    </div>
  );
}
