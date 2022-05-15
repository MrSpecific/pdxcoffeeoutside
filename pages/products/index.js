import Link from 'next/link';
import Layout from '@components/Layout';
import { shopifyClient } from '@shopify';
import { getAllProductsQuery } from '@shopify/queries';
import { flattenConnection } from '@shopify/utility';
import { ProductsProvider } from '@context/products';

export default function ProductsIndex({ products }) {
  return (
    <ProductsProvider value={{ products }}>
      <Layout>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link href={`/products/${product.handle}`}>
                <a>{product.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    </ProductsProvider>
  );
}

export async function getStaticProps() {
  const { data } = await shopifyClient.query({
    query: getAllProductsQuery,
  });
  return { props: { products: flattenConnection(data.products) } };
}
