import { gql } from '@apollo/client';

const getCheckoutUrlQuery = gql`
  query checkoutURL($id: ID!) {
    cart(id: $id) {
      checkoutUrl
    }
  }
`;

export default getCheckoutUrlQuery;
