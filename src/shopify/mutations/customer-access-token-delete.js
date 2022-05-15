import { gql } from '@apollo/client';

const customerAccessTokenDeleteMutation = /* GraphQL */ gql`
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      deletedCustomerAccessTokenId
      userErrors {
        field
        message
      }
    }
  }
`;

export default customerAccessTokenDeleteMutation;
