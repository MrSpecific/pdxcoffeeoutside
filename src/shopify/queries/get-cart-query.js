import { gql } from '@apollo/client';
import { cartDetailsFragment } from '@shopify/fragments';

const getCartQuery = gql`
  query getCart($id: ID!) {
    cart(id: $id) {
      ...cartDetailsFragment
    }
  }
  ${cartDetailsFragment}
`;

export default getCartQuery;
