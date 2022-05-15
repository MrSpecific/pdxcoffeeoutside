import { gql } from '@apollo/client';

const getAllProductVendors = /* GraphQL */ gql`
  query getAllProductVendors($first: Int = 250, $cursor: String) {
    products(first: $first, after: $cursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          vendor
        }
        cursor
      }
    }
  }
`;
export default getAllProductVendors;
