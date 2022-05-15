import Link from 'next/link';
import { shopifyClient } from '@shopify';
import { getSiteCollectionsQuery } from '@shopify/queries';
import { flattenConnection } from '@shopify/utility';
import Layout from '@components/Layout';
import { CatalogProvider } from '@context/catalog';

export default function CollectionsIndex({ collections }) {
  return (
    <Layout>
      <CatalogProvider value={{ collections }}>
        <h1>Collections</h1>
        <ul>
          {collections.map((collection) => (
            <li key={collection.id}>
              <Link href={`/collections/${collection.handle}`}>
                <a>{collection.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </CatalogProvider>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await shopifyClient.query({
    query: getSiteCollectionsQuery,
    variables: {
      first: 200,
    },
  });
  return { props: { collections: flattenConnection(data.collections) } };
}
