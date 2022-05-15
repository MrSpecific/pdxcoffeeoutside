import Layout from '@components/Layout';
import CartForm from '@components/forms/CartForm';

export default function CartIndex() {
  return (
    <Layout>
      <h1>Cart</h1>
      <CartForm />
    </Layout>
  );
}
