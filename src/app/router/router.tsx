import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '../layout/AppShell';
import { ProductsPage } from '../../features/products/ui/ProductsPage';
import { CartPage } from '../../features/cart/ui/CartPage';
import { CheckoutPage } from '../../features/checkout/ui/CheckoutPage';
import { SuccessPage } from '../../features/success/ui/SuccessPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Navigate to="/products" replace />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
      {
        path: 'success',
        element: <SuccessPage />,
      },
    ],
  },
]);
