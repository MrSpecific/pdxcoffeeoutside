import { gql } from '@apollo/client';

export const getPageQuery = /* GraphQL */ gql`
  query getPage($id: ID!) {
    node(id: $id) {
      id
      ... on Page {
        title
        handle
        body
        bodySummary
      }
    }
  }
`;
export default getPageQuery;
