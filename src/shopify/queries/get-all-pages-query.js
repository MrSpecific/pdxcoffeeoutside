import { gql } from '@apollo/client';

export const getAllPagesQuery = /* GraphQL */ gql`
  query getAllPages($first: Int = 250) {
    pages(first: $first) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;
export default getAllPagesQuery;
