import { shopifyClient } from '@shopify';
import { getAllProductsQuery } from '@shopify/queries';
import { flattenConnection } from '@shopify/utility';
import Layout from '@components/Layout';

function HomePage(props) {
  return (
    <Layout>
      <h1>Homepage</h1>
    </Layout>
  );
}

export default HomePage;

export async function getServerSideProps() {
  const { data } = await shopifyClient.query({
    query: getAllProductsQuery,
  });

  return { props: { products: flattenConnection(data.products) } };
}
