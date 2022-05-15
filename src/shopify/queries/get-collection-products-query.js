import { gql } from '@apollo/client';
import { productConnectionFragment } from './get-all-products-query';

const getCollectionProductsQuery = /* GraphQL */ gql`
  query getProductsFromCollection(
    $categoryId: ID!
    $first: Int = 250
    $sortKey: ProductCollectionSortKeys = RELEVANCE
    $reverse: Boolean = false
  ) {
    node(id: $categoryId) {
      id
      ... on Collection {
        products(first: $first, sortKey: $sortKey, reverse: $reverse) {
          ...productConnection
        }
      }
    }
  }
  ${productConnectionFragment}
`;
export default getCollectionProductsQuery;
