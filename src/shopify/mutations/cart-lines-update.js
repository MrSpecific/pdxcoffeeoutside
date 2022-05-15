import { gql } from '@apollo/client';
import { cartDetailsFragment } from '@shopify/fragments';

const cartLinesUpdateMutation = gql`
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
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

export default cartLinesUpdateMutation;
