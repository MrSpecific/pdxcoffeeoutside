import { gql } from '@apollo/client';
import { cartDetailsFragment } from '@shopify/fragments';

const cartLinesRemoveMutation = gql`
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cartDetailsFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${cartDetailsFragment}
`;

export default cartLinesRemoveMutation;
