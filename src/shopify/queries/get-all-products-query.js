import { gql } from '@apollo/client';

export const productConnectionFragment = /* GraphQL */ gql`
  fragment productConnection on ProductConnection {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        id
        title
        vendor
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 1) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              originalSrc
              altText
              width
              height
            }
          }
        }
      }
    }
  }
`;

const getAllProductsQuery = /* GraphQL */ gql`
  query getAllProducts(
    $first: Int = 250
    $query: String = ""
    $sortKey: ProductSortKeys = RELEVANCE
    $reverse: Boolean = false
  ) {
    products(first: $first, sortKey: $sortKey, reverse: $reverse, query: $query) {
      ...productConnection
    }
  }

  ${productConnectionFragment}
`;
export default getAllProductsQuery;
