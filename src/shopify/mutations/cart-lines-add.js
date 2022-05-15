import { gql } from '@apollo/client';
import { cartDetailsFragment } from '@shopify/fragments';

const cartLinesAddMutation = gql`
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cartDetailsFragment
      }
    }
    # userErrors {
    #   field
    #   message
    # }
  }
  ${cartDetailsFragment}
`;

export default cartLinesAddMutation;
