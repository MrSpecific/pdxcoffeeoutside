import { gql } from '@apollo/client';

export const getCustomerOrdersQuery = /* GraphQL */ gql`
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      orders(first: 10) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;
export default getCustomerOrdersQuery;
