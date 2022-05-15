import { gql } from '@apollo/client';

export const getCustomerQuery = /* GraphQL */ gql`
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      displayName
      email
      phone
      tags
      acceptsMarketing
      createdAt
    }
  }
`;
export default getCustomerQuery;
