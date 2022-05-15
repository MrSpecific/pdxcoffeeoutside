import { gql } from '@apollo/client';

export const getCustomerQuery = /* GraphQL */ gql`
  query getCustomerId($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
    }
  }
`;
export default getCustomerQuery;
