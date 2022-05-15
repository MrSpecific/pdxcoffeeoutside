import { gql } from '@apollo/client';

const getSiteInfoQuery = /* GraphQL */ gql`
  query getSiteInfo {
    shop {
      name
    }
  }
`;
export default getSiteInfoQuery;
