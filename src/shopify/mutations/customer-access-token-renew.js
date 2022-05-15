import { gql } from '@apollo/client';

const customerAccessTokenRenew = /* GraphQL */ gql`
  mutation customerAccessTokenRenew($customerAccessToken: String!) {
    customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export default customerAccessTokenRenew;
