import { ShoppingCart, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getContainer } from '../di/container';

export function Header() {
  const [itemCount, setItemCount] = useState(0);
  const container = getContainer();

  useEffect(() => {
    const updateCount = async () => {
      const items = await container.useCases.getCartSnapshot.execute();
      const totals = container.useCases.calculateCartTotals.execute(items);
      setItemCount(totals.itemCount);
    };

    updateCount();

    const interval = setInterval(updateCount, 1000);
    return () => clearInterval(interval);
  }, [container]);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/products" className="flex items-center gap-2 text-xl font-bold text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg">
            <Store className="w-6 h-6" />
            CartXpress
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to="/products"
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded transition-colors px-2 py-1"
            >
              Produtos
            </Link>
            <Link
              to="/cart"
              className="relative flex items-center gap-2 text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded transition-colors px-2 py-1"
            >
              <ShoppingCart className="w-5 h-5" />
              Carrinho
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
