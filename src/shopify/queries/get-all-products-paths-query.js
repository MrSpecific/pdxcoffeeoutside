import { gql } from '@apollo/client';

const getAllProductsPathsQuery = /* GraphQL */ gql`
  query getAllProductPaths($first: Int = 250, $cursor: String) {
    products(first: $first, after: $cursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          handle
        }
        cursor
      }
    }
  }
`;
export default getAllProductsPathsQuery;
