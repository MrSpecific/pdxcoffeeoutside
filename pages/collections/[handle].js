import { shopifyClient } from '@shopify';
import { getSiteCollectionsQuery, getCollectionProductsQuery } from '@shopify/queries';
import { flattenConnection } from '@shopify/utility';
import Layout from '@components/Layout';
import { CollectionProvider } from '@context/collection';

const CollectionHandle = ({ title, handle, products }) => {
  return (
    <Layout>
      <CollectionProvider value={{ products }}>
        <h1>{title}</h1>
      </CollectionProvider>
    </Layout>
  );
};

export default CollectionHandle;

export async function getStaticPaths() {
  const { data } = await shopifyClient.query({
    query: getSiteCollectionsQuery,
    variables: {
      first: 200,
    },
  });

  const paths = flattenConnection(data.collections).map(({ handle }) => ({
    params: { handle },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { handle } = context.params;
  const { data: siteCollectionsData } = await shopifyClient.query({
    query: getSiteCollectionsQuery,
    variables: {
      first: 200,
    },
  });

  const collection = flattenConnection(siteCollectionsData.collections).find((c) => {
    return c.handle === handle;
  });

  const { id } = collection;

  const { data: collectionProductsData } = await shopifyClient.query({
    query: getCollectionProductsQuery,
    variables: {
      categoryId: id,
      first: 200,
    },
  });

  return {
    props: {
      ...collection,
      products: flattenConnection(collectionProductsData.node.products),
    },
  };
}
