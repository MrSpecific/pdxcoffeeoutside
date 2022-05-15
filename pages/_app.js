/* eslint-disable react/jsx-props-no-spreading */
import { CheckoutProvider } from '@context/checkout';
import { CartProvider } from '@context/cart';
import { AuthProvider } from '@context/auth';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CheckoutProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </CheckoutProvider>
    </AuthProvider>
  );
}
