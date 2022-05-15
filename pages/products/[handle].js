import Layout from '@components/Layout';
import { ProductProvider, useProduct } from '@context/product';
import { useCart } from '@context/cart';
import { shopifyClient } from '@shopify';
import { getAllProductsQuery, getProductQuery } from '@shopify/queries';
import { flattenConnection } from '@shopify/utility';
import ProductForm from '@components/ProductForm';

export default function ProductHandle({ product }) {
  const { addToCart } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addToCart({ id: product.variants[0].id });
  };

  return (
    <ProductProvider value={{ product }}>
      <Layout>
        <h1>{product.title}</h1>
        <ProductForm onSubmit={handleSubmit} />
      </Layout>
    </ProductProvider>
  );
}

export async function getStaticPaths() {
  const { data } = await shopifyClient.query({
    query: getAllProductsQuery,
  });
  const products = flattenConnection(data.products);
  const paths = products.map((product) => ({ params: { handle: product.handle } }));
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { handle } = context.params;
  const { data } = await shopifyClient.query({
    query: getProductQuery,
    variables: {
      handle,
    },
  });

  return {
    props: {
      product: {
        ...data.productByHandle,
        images: flattenConnection(data.productByHandle.images),
        variants: flattenConnection(data.productByHandle.variants),
      },
    },
  };
}
